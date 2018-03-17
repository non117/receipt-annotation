require 'base64'
require 'faraday'
require 'json'
require 'time'
require 'pathname'

class OCR
  HOST = 'https://vision.googleapis.com'.freeze
  ANNOTATE_API = '/v1/images:annotate'.freeze

  def initialize(api_key)
    @api_key = api_key
  end

  def body(image_bin)
    {
      requests: [
        {
          image: {
            content: image_bin
          },
          features: [
            {
              type: :DOCUMENT_TEXT_DETECTION,
            },
          ],
          imageContext: {
            languageHints: [:ja, :en],
          },
        },
      ],
    }
  end

  def call(image_bin)
    conn = Faraday.new(url: HOST)
    response = conn.post do |req|
      req.url ANNOTATE_API
      req.headers['Content-Type'] = 'application/json'
      req.params[:key] = @api_key
      req.body = body(image_bin).to_json
    end
    JSON.parse(response.body)
  end
end

class Text
  # text_annotation is a response of google vision api
  # {
  #   description: "annotated text",
  #   boundingPoly: {
  #     vertices: [{x: 123, y: 0}, {x: 234, y: 1}, {x: 345, y:2}, {x: 456, y:3}]
  #   }
  # }
  attr_accessor :height, :width, :position, :text, :x
  def initialize(text_annotation)
    @text = text_annotation['description']
    rect = text_annotation.dig('boundingPoly', 'vertices')
    @height = rect[3]['y'] - rect[0]['y']
    @width = 0
    # ¥単体が入ってくると0 divisionになってしまうので除く
    # CloudVisionの結果といえどnullが入ったへんなデータがある
    if rect[0]['x'] && rect[1]['x'] && @text != "¥"
      @width = (rect[1]['x'] - rect[0]['x']) / @text.delete("¥").size # ¥のフォントが小さすぎるので除外する
    end
    @position = (rect[3]['y'] + rect[0]['y']) / 2
    @x = rect.map{ |v| v['x'] }.compact.min
  end

  def to_s
    "#{@width}, #{@text}"
  end

  # 前後の文字列の位置誤差が、フォントの高さに収まっているなら同じ行とする
  def same_line?(other_text)
    min_height = [@height, other_text.height].min
    (other_text.position - @position).abs < min_height / 3 # 閾値は適当
  end
end

def is_number?(c)
  (48..57).include? c
end

class Line
  DATE_PATTERN = /(20\d\d-\d\d?-\d\d?)|(20\d\d年\d\d?月\d\d?日)/
  SUM_PATTERN = /合計/
  REPLACE_DATE_SYMBOLS = ['年', '月', '日']
  attr_reader :text, :max_width
  def initialize(texts)
    @text = texts.map(&:text).join
    @max_width = texts.max_by(&:width)&.width.to_i
  end

  def to_s
    "#{@max_width}, #{@text}"
  end

  def date
    is_date? ? Time.parse(cleaned_date) : nil
  rescue ArgumentError
    nil
  end

  # 合計が含まれる行ならば、数値っぽいのを取り出してみる
  def sum
    if is_sum?
      @text.each_char.map(&:ord).select(&method(:is_number?)).map(&:chr).join.to_i
    end
  end

  # 店の名前を過去の事例から推定する
  def shop_name(shop_name_db)
  end

  private
  def is_date?
    @text.match(DATE_PATTERN)
  end

  def is_sum?
    @text.match(SUM_PATTERN)
  end

  # 年月日を/に置換するとTime.parseで扱いやすい
  def cleaned_date
    REPLACE_DATE_SYMBOLS.reduce(@text) do |date, sym|
      date.sub(sym, '/')
    end
  end
end

class Receipt
  attr_reader :annotated_receipt
  def initialize(image_path, ocr_client)
    @image_path = image_path
    @ocr_client = ocr_client
    @shop_name_db = []
  end

  def annotate!
    image_bin = Base64.strict_encode64(File.binread(@image_path))
    @annotated_receipt = @ocr_client.call(image_bin)
    p @annotated_receipt["error"]
    @lines = construct_lines(@annotated_receipt.dig('responses', 0, 'textAnnotations')[1..-1]) # 0番目は全テキストくっつけたやつ
    self
  end

  def to_h
    {
      imagePath: @image_path,
      date: date,
      sum: sum,
      memo: shop_name,
    }
  end

  private
  def date
    @lines.map(&:date).compact.first
  end

  def sum
    @lines.select(&:sum).max_by(&:max_width)&.sum
  end

  def shop_name
    @lines.map{ |line| line.shop_name(@shop_name_db) }.compact.first
  end
end

# 自分のTextと同じ行と思われるTextを全探索し,
# あとからuniqをかける.
# OCR結果が行頭からの順序になってるとは限らないため.
def construct_lines(text_annotations)
  texts = text_annotations.map do |text_annotation|
    Text.new(text_annotation)
  end
  lines = texts.map do |text|
    line_texts = texts.select do |text_other|
      text != text_other && text.same_line?(text_other)
    end
    line_texts << text
    Line.new(line_texts.sort_by(&:x))
  end
  lines.uniq(&:text)
end

SETTINGS_FILE_PATH = Pathname.new(__FILE__).expand_path.basename / '../config/setting.json'
DEBUG_FILE_PATH = Pathname.new(__FILE__).expand_path.basename / '../debug.json'

def main()
  settings = JSON.load(SETTINGS_FILE_PATH.read)
  receipt_image_directory = settings.dig('receiptImageDirectory')
  output_path = settings.dig('annotatedJsonPath')
  receipt_images = Dir.glob(File.join(receipt_image_directory, '*'))
  ocr = OCR.new(settings.dig('apiKey'))
  original_annotations = []
  receipts = receipt_images.map do |image|
    receipt = Receipt.new(image, ocr).annotate!
    puts receipt.to_h
    original_annotations << receipt.annotated_receipt
    receipt.to_h
  end
  File.write(DEBUG_FILE_PATH, original_annotations.to_json)
  File.write(output_path, receipts.to_json)
rescue e
  puts e
  puts e.backtrace.join "\n"
  puts original_annotations.last
  File.write(DEBUG_FILE_PATH, original_annotations.to_json)
end

main
require 'base64'
require 'faraday'
require 'json'
require 'time'
require 'yaml'

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
  attr_accessor :height, :position, :text, :x
  def initialize(text_annotation)
    @text = text_annotation['description']
    rect = text_annotation.dig('boundingPoly', 'vertices')
    @height = rect[3]['y'] - rect[0]['y']
    @position = (rect[3]['y'] + rect[0]['y']) / 2
    @x = rect.map{ |v| v['x'] }.compact.min
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
  attr_reader :text
  def initialize(texts)
    @text = texts.map(&:text).join
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
    @lines = construct_lines(@annotated_receipt.dig('responses', 0, 'textAnnotations')[1..-1]) # 0番目は全テキストくっつけたやつ
    self
  end

  def to_h
    {
      image_path: @image_path,
      date: date,
      sum: sum,
      shop_name: shop_name,
    }
  end

  private
  def date
    @lines.map(&:date).compact.first
  end

  def sum
    @lines.map(&:sum).compact.first
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

SETTINGS_FILE_PATH = './settings.yml'
OUTPUT_FILENAME = 'receipts.json'
DEBUG_FILENAME = 'debug_annotations.json'

def main()
  settings = YAML.load(File.read(SETTINGS_FILE_PATH))
  receipt_image_directory = settings.dig('receipt_image_directory')
  output_directory = settings.dig('output_directory')
  receipt_images = Dir.glob(File.join(receipt_image_directory, '*'))
  ocr = OCR.new(settings.dig('api_key'))
  original_annotations = []
  receipts = receipt_images.map do |image|
    receipt = Receipt.new(image, ocr).annotate!
    original_annotations << receipt.annotated_receipt
    receipt.to_h
  end
  File.write(File.join(output_directory, DEBUG_FILENAME), original_annotations.to_json)
  File.write(File.join(output_directory, OUTPUT_FILENAME), receipts.to_json)
end

main
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
              type: :TEXT_DETECTION,
              maxResults: 2,
            },
          ],
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
  attr_accessor :height, :position, :text
  def initialize(text_annotation)
    @text = text_annotation['description']
    rect = text_annotation.dig('boundingPoly', 'vertices')
    @height = rect[3]['y'] - rect[0]['y']
    @position = (rect[3]['y'] + rect[0]['y']) / 2
  end

  # 前後の文字列の位置誤差が、フォントの高さに収まっているなら同じ行とする
  def same_line?(another_text)
    min_height = [@height, another_text.height].min
    (another_text.position - @position).abs <= min_height
  end
end

def is_number?(c)
  (48..57).include? c
end

class Line
  DATE_PATTERN = /(20\d\d-\d\d?-\d\d?)|(20\d\d年\d\d?月\d\d?日)/
  SUM_PATTERN = /合計/
  REPLACE_DATE_SYMBOLS = ['年', '月', '日']
  def initialize(texts)
    @text = texts.map(&:text).join
  end

  def date
    self.is_date? ? Time.parse(cleaned_date) : nil
  rescue ArgumentError
    nil
  end

  # 合計が含まれる行ならば、数値っぽいのを取り出してみる
  def sum
    if self.is_sum?
      @text.each_char.map(&:ord).select(&:is_number?).map(&:chr).join.to_i
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

  def to_json
    {
      image_path: @image_path,
      date: self.date,
      sum: self.sum,
      shop_name: self.shop_name,
      annotated_receipt: @annotated_receipt,
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

# 同じ行の文字列をくっつけていって、n行の文字列にまとめる
def construct_lines(text_annotations)
  lines = []
  prev_text = Text.new(text_annotations.first)
  tmp_texts = [prev_text]
  text_annotations[1..-1].each do |text_annotation|
    text = Text.new(text_annotation)
    if prev_text.same_line? text
      tmp_texts << text
    else
      lines << Line.new(tmp_texts)
      tmp_texts = [text]
    end
    prev_text = text
  end
  lines << Line.new(tmp_texts) unless tmp_texts.empty?
  lines
end

SETTINGS_FILE_PATH = './settings.yml'
OUTPUT_FILENAME = 'receipts.json'

def main()
end  settings = YAML.load(File.read(SETTINGS_FILE_PATH))
  receipt_image_directory = settings.dig('receipt_image_directory')
  output_directory = settings.dig('output_directory')
  receipt_images = Dir.glob(File.join(receipt_image_directory, '*'))

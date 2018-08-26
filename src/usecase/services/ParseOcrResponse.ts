import Line from "../../domain/Line";
import Phrase from "../../domain/Phrase";

interface Point {
  x: number;
  y: number;
}

interface BoundingPoly {
  vertices: Array<Point>;
}

interface TextAnnotation {
  description: string;
  boundingPoly: BoundingPoly;
}

interface Response {
  textAnnotations: Array<TextAnnotation>;
}

export interface AnnotatedText {
  responses: Array<Response>;
}

function buildPhrase(textAnnotation: TextAnnotation) {
  const rect = textAnnotation.boundingPoly.vertices;
  const height = rect[3].y - rect[0].y;
  let width = 0;
  // ¥単体が入ってくると0 divisionになってしまうので除く
  if (this.text !== "¥") {
    const characterCount = this.text.replace(/¥/g, "").length;
    width = (rect[1].x - rect[0].x) / characterCount;
  }
  const position = (rect[3].y + rect[0].y) / 2;
  const x = rect.map(p => p.x).sort()[0];
  return new Phrase(height, width, position, x, textAnnotation.description);
}

// 自分のTextと同じ行と思われるTextを全探索し,
// あとからuniqをかける.
// OCR結果が行頭からの順序になってるとは限らないため.
function buildLines(textAnnotations: Array<TextAnnotation>): Array < Line > {
  const phrases = textAnnotations.map(buildPhrase);
  const lines = phrases.map(phrase => {
    let tempPhrases = phrases.filter(otherPhrase => {
      return phrase !== otherPhrase && phrase.isSameLine(otherPhrase);
    })
    tempPhrases.push(phrase);
    // Line.new(line_texts.sort_by(&:x))
    return new Line(tempPhrases.sort((a, b) => {
      if (a.x < b.x) return -1;
      if (a.x > b.x) return 1;
      return 0;
    }));
  })
  return Array.from(new Set(lines));
}

export function parseOcrResponse(annotatedText: AnnotatedText): Array<Line> {
  const textAnnotations = annotatedText.responses[0].textAnnotations;
  textAnnotations.shift; // 0番目はすべてが結合されたやつなので捨てる
  return buildLines(textAnnotations);
}
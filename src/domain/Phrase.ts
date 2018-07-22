export default class Phrase {
  height: number;
  width: number;
  position: number;
  x: number;
  text: string;

  constructor(textAnnotation: TextAnnotation) {
    this.text = textAnnotation.description;
    const rect = textAnnotation.boundingPoly.vertices;
    this.height = rect[3].y - rect[0].y;
    this.width = 0;
    // ¥単体が入ってくると0 divisionになってしまうので除く
    if(this.text !== "¥") {
      const characterCount = this.text.length; // FIXME: ¥をのぞく
      this.width = (rect[1].x - rect[0].x) / characterCount;
    }
    this.position = (rect[3].y + rect[0].y) / 2;
    this.x = rect.map(p => p.x).sort()[0];
  }

  // 前後の文字列の位置誤差が、フォントの高さに収まっているなら同じ行とする
  // 閾値はてきとう
  isSameLine(otherPhrase: Phrase) {
    const minHeight = [this.height, otherPhrase.height].sort[0];
    return Math.abs(otherPhrase.position - this.position) < minHeight / 3;
  }
}

export interface Point {
  x: number;
  y: number;
}

export interface BoundingPoly {
  vertices: Array<Point>;
}

export interface TextAnnotation {
  description: string;
  boundingPoly: BoundingPoly;
}
export default class Phrase {
  height: number;
  width: number;
  position: number;
  x: number;
  text: string;

  constructor(height: number, width: number, position: number, x: number, text: string) {
    this.height, this.width, this.position, this.x = height, width, position, x;
    this.text = text;
  }

  // 前後の文字列の位置誤差が、フォントの高さに収まっているなら同じ行とする
  // 閾値はてきとう
  isSameLine(otherPhrase: Phrase) {
    const minHeight = [this.height, otherPhrase.height].sort[0];
    return Math.abs(otherPhrase.position - this.position) < minHeight / 3;
  }
}
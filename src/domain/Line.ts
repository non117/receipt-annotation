import Phrase from "./Phrase";

export default class Line {
  SUM_PATTERN = /合計/;
  text: string;
  maxWidth: number;

  constructor(phrases: Array<Phrase>) {
    this.text = phrases.map(p => p.text).join();
    // FIXME: なんとかならんか
    this.maxWidth = phrases.map(p => p.width).sort()[phrases.length - 1];
  }

  date() {
    // momentでパースした日付オブジェクトをかえす
    return null;
  }

  sum(): number {
    if(this.isSum()) {
      return +this.text.split("").filter(c => !isNaN(+c)).join("")
    }
  }

  findText(keywords: Array<string>): string {
    return keywords.filter(keyword => {
      return keyword; // FIXME: レーベンシュタイン
    })[0];
  }

  private isSum(): boolean {
    return this.SUM_PATTERN.test(this.text);
  }
}
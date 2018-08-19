import Phrase from "./Phrase";
import * as levenshtein from "fast-levenshtein";
import * as moment from "moment";

export default class Line {
  SUM_PATTERN = /合計/;
  THRESHOLD = 0.4
  text: string;
  maxWidth: number;

  constructor(phrases: Array<Phrase>) {
    this.text = phrases.map(p => p.text).join();
    // FIXME: なんとかならんか
    this.maxWidth = phrases.map(p => p.width).sort()[phrases.length - 1];
  }

  date() {
    const parsed = moment(this.text);
    return parsed.isValid() ? parsed : null;
  }

  sum(): number {
    if(this.isSum()) {
      return +this.text.split("").filter(c => !isNaN(+c)).join("")
    }
  }

  findText(keywords: Array<string>): string {
    return keywords.filter(keyword => levenshtein.get(keyword, this.text) < this.THRESHOLD)[0];
  }

  private isSum(): boolean {
    return this.SUM_PATTERN.test(this.text);
  }
}
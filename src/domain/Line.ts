import Phrase from "./Phrase";
import * as levenshtein from "fast-levenshtein";
import moment from "moment";

export default class Line {
  SUM_PATTERN = /合計/;
  DATE_FORMATS = ['YYYY/MM/DD', 'YYYY-MM-DD', 'YYYY年MM月DD日'];
  THRESHOLD = 0.4
  text: string;
  maxWidth: number;

  constructor(phrases: Array<Phrase>) {
    this.text = phrases.map(p => p.text).join("");
    // FIXME: なんとかならんか
    this.maxWidth = phrases.map(p => p.width).sort()[phrases.length - 1];
  }

  date() {
    const parsed = moment(this.text, this.DATE_FORMATS);
    return parsed.isValid() && this.validYear(parsed) ? parsed : null;
  }

  sum(): number {
    if(this.isSum()) {
      return +this.text.split("").filter(c => !isNaN(+c)).join("")
    }
    return null;
  }

  findText(keywords: Array<string>): string {
    return keywords.filter(keyword => levenshtein.get(keyword, this.text) < this.THRESHOLD)[0];
  }

  private isSum(): boolean {
    return this.SUM_PATTERN.test(this.text);
  }

  private validYear(m: moment.Moment): boolean {
    const yearDiff = moment().year() - m.year();
    return yearDiff >= 0 && yearDiff <= 1;
  }
}
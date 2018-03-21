import * as fs from "fs";

export class Reader {
  static execute(path: string): string {
    return fs.readFileSync(path).toString();
    // TODO error handling
  }
}

export class Writer {
  static execute(path: string, content: string) {
    fs.writeFileSync(path, content);
    // TODO error handling
  }
}
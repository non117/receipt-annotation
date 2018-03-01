import * as fs from "fs";

export class JSONReader {
  static execute(jsonPath: string): string {
    return fs.readFileSync(jsonPath).toString();
    // TODO error handling
  }
}

export class JSONWriter {
  static execute(jsonPath: string, content: string) {
    // TODO
  }
}
import * as fs from "fs";
import promisify = require("util.promisify");

export class Reader {
  static execute(path: string): string {
    return fs.readFileSync(path).toString();
    // TODO error handling
  }
}

export class Writer {
  static execute(path: string, content: string): Promise<void> {
    return promisify(fs.writeFile)(path, content);
  }
}
import * as fs from "fs";
// https://grizzlybit.info/2017/09/29/Node-JS-8-Util-Promisify/
import * as util from "util";
require('util.promisify').shim();

export class Reader {
  static execute(path: string): string {
    return fs.readFileSync(path).toString();
    // TODO error handling
  }
}

export class Writer {
  static execute(path: string, content: string): Promise<void> {
    return util.promisify(fs.writeFile)(path, content);
  }
}
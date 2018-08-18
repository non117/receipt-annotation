import * as fs from "fs";
// https://grizzlybit.info/2017/09/29/Node-JS-8-Util-Promisify/
import * as util from "util";
require('util.promisify').shim();

export function readFile(path: string): string {
  return fs.readFileSync(path).toString();
  // TODO error handling
}

export function writeFile(path: string, content: string): Promise<void> {
  return util.promisify(fs.writeFile)(path, content);
}
import * as fs from "fs";
import * as path from "path";
// https://grizzlybit.info/2017/09/29/Node-JS-8-Util-Promisify/
import * as util from "util";
require('util.promisify').shim();

export function readFile(path: string): string {
  return fs.readFileSync(path).toString();
  // TODO error handling
}

export function listFiles(directory: string): Array<string> {
  const basePath = path.resolve(directory);
  const files = fs.readdirSync(basePath);
  // TODO: extensionでフィルタ
  return files.map(file => path.join(basePath, file));
}

export function writeFile(path: string, content: string): Promise<void> {
  return util.promisify(fs.writeFile)(path, content);
}
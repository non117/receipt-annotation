import fs from "fs";
import path from "path";
// https://grizzlybit.info/2017/09/29/Node-JS-8-Util-Promisify/
import util from "util";
require("util.promisify").shim();

export function readFile(path: string): Buffer {
  return fs.readFileSync(path);
  // TODO error handling
}

export function listImageFiles(directory: string): Array<string> {
  const imageExts = [".jpg", ".png"];
  const basePath = path.resolve(directory);
  const files = fs.readdirSync(basePath);
  return files
    .map(file => path.join(basePath, file))
    .filter(p => imageExts.includes(path.extname(p)));
}

export function writeFile(path: string, content: string): Promise<void> {
  return util.promisify(fs.writeFile)(path, content);
}

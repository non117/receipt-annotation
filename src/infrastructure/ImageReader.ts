import * as fs from "fs";

export function readEncodedImage(path: string): string {
  return fs.readFileSync(path, "base64")
}
import axios, { AxiosInstance } from "axios";
import { readFile } from "./FileIO";

export default class OcrClient {
  HOST = "https://vision.googleapis.com";
  ANNOTATE_PATH = "/v1/images:annotate";

  apiKey: string;
  client: AxiosInstance;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: this.HOST,
      headers: {"Content-Type": "application/json"},
    })
  }

  private payload(imageContent: string) {
    return {
      requests: [
        {
          image: {
            content: imageContent,
          },
          features: [
            {
              type: "DOCUMENT_TEXT_DETECTION",
            },
          ],
          imageContext: {
            languageHints: ["ja", "en"],
          },
        },
      ],
    }
  }

  async call(imagePath: string) {
    const buf = Buffer.from(readFile(imagePath));
    return this.client({
      method: "post",
      url: this.ANNOTATE_PATH,
      params: {
        key: this.apiKey,
      },
      data: JSON.stringify(this.payload(buf.toString("base64"))),
    });
  }
}
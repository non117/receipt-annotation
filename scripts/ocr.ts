import OcrClient from "../src/infrastructure/OcrClient";
import fs from "fs";
import path from "path";

const settings: { apiKey: string } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../config/settings.json")).toString()
);
const imagePath = process.argv[2];

interface Data {
  responses: [
    {
      fullTextAnnotation: {
        text: string;
      };
    }
  ];
}

new OcrClient(settings.apiKey).call(imagePath).then((response) => {
  const data: Data = response.data;
  const texts = data.responses
    .map((obj) => obj.fullTextAnnotation.text)
    .join("\n");
  console.log(texts);
});

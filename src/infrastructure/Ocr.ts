import * as Axios from "axios";
import { AxiosPromise } from "axios";
import { readEncodedImage } from "./ImageReader";

// response structure
interface Vertice {
  x: number;
  y: number;
}
interface BoundingPoly {
  vertices: Vertice[];
}
interface TextAnnotation {
  locale: string | null;
  description: string;
  boundingPoly: BoundingPoly;
}
interface Response {
  textAnnotations: TextAnnotation[];
}

class Client {
  axios: Axios.AxiosInstance;
  annotatePath: "/v1/images:annotate";
  constructor(apiKey: string) {
    this.axios = Axios.default.create({
      "baseURL": "https://vision.googleapis.com",
      "headers": { "Content-Type": "application/json" }
    });
  }
  annotate(imagePath: string): AxiosPromise {
    const b64Image = readEncodedImage(imagePath);
    const data = {
      "requests": [
        {
          "image": { "content": b64Image },
          "features": [
            {
              "type": "TEXT_DETECTION",
              "maxResults": 2
            }
          ]
        }
      ]
    };
    return this.axios.post(this.annotatePath, data);
  }
}

export { Vertice, BoundingPoly, TextAnnotation, Response, Client}
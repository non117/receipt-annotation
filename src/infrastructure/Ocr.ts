import * as Axios from "axios";
import { AxiosPromise } from "axios";

declare module namespace {
  // request structure
  interface Feature {
    type: string;
    maxResults: number;
  }
  interface Image {
    content: string;
  }
  interface Request {
    image: Image;
    features: Feature[];
  }
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
  // TODO: when promise is resolved?
  annotate(imagePath: string): AxiosPromise {
    // get image from fs
    // convert image base64
    // create request structure
    const data = "";
    return this.axios.post(this.annotatePath, data);
  }
}
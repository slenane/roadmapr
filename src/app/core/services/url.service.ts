import { Injectable } from "@angular/core";
import { ENDPOINTS } from "../constants/http.constants";

@Injectable({
  providedIn: "root",
})
export class UrlService {
  constructor() {}

  public generate(endpoint: string, data?: {}): string {
    return `http://localhost:3000${ENDPOINTS[endpoint]}`;
  }
}

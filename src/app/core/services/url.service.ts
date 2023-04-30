import { Injectable } from "@angular/core";
import { BASE_URL, ENDPOINTS } from "../constants/http.constants";

@Injectable({
  providedIn: "root",
})
export class UrlService {
  constructor() {}

  public generate(endpoint: string, data?: any): string {
    const params = data ? data : "";
    const url = BASE_URL + ENDPOINTS[endpoint] + params;

    return url;
  }
}

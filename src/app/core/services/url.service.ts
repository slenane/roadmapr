import { Injectable } from "@angular/core";
import { ENDPOINTS } from "../constants/http.constants";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UrlService {
  constructor() {}

  public generate(endpoint: string, data?: any): string {
    const params = data ? data : "";
    const url = environment.baseUrl + ENDPOINTS[endpoint] + params;

    return url;
  }
}

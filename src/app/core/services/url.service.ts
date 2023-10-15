import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UrlService {
  constructor() {}

  public generate(endpoint: string, data?: any): string {
    const params = data ? data : "";
    const url = environment.baseUrl + endpoint + params;
    return url;
  }
}

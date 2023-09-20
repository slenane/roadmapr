import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OAuthService {
  constructor(private http: HttpClient) {}

  GetAuthPage(): Observable<string> {
    return this.http.get<string>(environment.baseUrl + "/auth-page");
  }

  getAccessToken(auth_code: string): Observable<any> {
    return this.http.post(environment.baseUrl + "/get-access-token", {
      code: auth_code,
    });
  }
}

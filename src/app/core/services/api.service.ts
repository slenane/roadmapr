import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
// import { TokenPayload } from "../store/auth.models";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get(url: string, queryParams?: any): Observable<any> {
    return this.http.get(url, queryParams);
  }

  public post(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

  public patch(url: string, body: any): Observable<any> {
    return this.http.patch(url, body);
  }

  // private request(
  //   method: any,
  //   type: any,
  //   user?: TokenPayload
  // ): Observable<any> {
  //   let base: any;

  //   if (method === "post") {
  //     base = this.apiService.post(this.urlService.generate(type), user);
  //   } else {
  //     base = this.apiService.get(this.urlService.generate(type), {
  //       headers: { Authorization: `Bearer ${this.getToken()}` },
  //     });
  //   }

  //   const request = base.pipe(
  //     map((data: TokenResponse) => {
  //       if (data.token) {
  //         this.authenticated.next(true);
  //         this.saveToken(data.token);
  //       }
  //       return data;
  //     })
  //   );

  //   return request;
  // }
}

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get(url: string, queryParams?: any): Observable<any> {
    return this.http.get(url, queryParams);
  }

  public post(url: string, queryParams: any): Observable<any> {
    return this.http.post(url, queryParams);
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router, UrlSerializer } from "@angular/router";
import { User, TokenResponse, TokenPayload } from "../store/auth.models";
import { ApiService } from "./api.service";
import { UrlService } from "./url.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: string;
  private authenticated = new BehaviorSubject<boolean>(false);

  get isAuthenticated() {
    return this.authenticated.asObservable();
  }

  constructor(
    private apiService: ApiService,
    private urlService: UrlService,
    private router: Router
  ) {}

  public getUser(): User | null {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUser();
    if (user) {
      this.authenticated.next(true);
      return user.exp > Date.now() / 1000;
    } else {
      this.authenticated.next(false);
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
    console.log(user);
    return this.request("post", "REGISTER", user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request("post", "LOGIN", user);
  }

  public getProfile(): Observable<any> {
    return this.request("get", "PROFILE");
  }

  private request(
    method: "post" | "get",
    type: "LOGIN" | "REGISTER" | "PROFILE",
    user?: TokenPayload
  ): Observable<any> {
    let base: any;

    if (method === "post") {
      base = this.apiService.post(this.urlService.generate(type), user);
    } else {
      base = this.apiService.get(this.urlService.generate(type), {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.authenticated.next(true);
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  private saveToken(token: string): void {
    localStorage.setItem("user-token", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("user-token") || "";
    }
    return this.token;
  }

  public logout(): void {
    this.token = "";
    this.authenticated.next(false);
    window.localStorage.removeItem("user-token");
    this.router.navigateByUrl("/login");
  }
}

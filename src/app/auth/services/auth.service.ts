import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User, TokenPayload, TokenResponse } from "../store/auth.models";
import { ApiService } from "../../core/services/api.service";
import { UrlService } from "../../core/services/url.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: string;
  private authenticated = new BehaviorSubject<boolean>(false);

  get isAuthenticated() {
    return this.authenticated.asObservable();
  }

  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public register(user: TokenPayload): Observable<any> {
    return this.apiService.post(
      this.urlService.generate("AUTH_REGISTER"),
      user
    );
  }

  public login(user: TokenPayload): Observable<any> {
    return this.apiService
      .post(this.urlService.generate("AUTH_LOGIN"), user)
      .pipe(
        map((data: TokenResponse) => {
          if (data.token) {
            this.authenticated.next(true);
            this.saveToken(data.token);
          }
          return data;
        })
      );
  }

  public getGithubAuthPage(): Observable<string> {
    return this.apiService.get(this.urlService.generate("GITHUB_AUTH_PAGE"));
  }

  public getGithubAccessToken(auth_code: string): Observable<any> {
    return this.apiService.post(
      this.urlService.generate("GITHUB_AUTH_ACCESS_TOKEN"),
      {
        code: auth_code,
      }
    );
  }

  public githubLogin(): Observable<any> {
    return this.apiService
      .get(this.urlService.generate("GITHUB_AUTH_LOGIN"))
      .pipe(
        map((data: TokenResponse) => {
          if (data.token) {
            this.authenticated.next(true);
            this.saveToken(data.token);
          }
          return data;
        })
      );
  }

  public logout(): void {
    this.token = "";
    this.authenticated.next(false);
    this.clearLocalStorage();
  }

  private clearLocalStorage() {
    window.localStorage.removeItem("user-token");
    window.localStorage.removeItem("selected-theme");
    window.localStorage.removeItem("preferred-language");
  }

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

  checkUniqueUsername(username: string): Observable<any> {
    return this.apiService.get(
      this.urlService.generate("CHECK_UNIQUE_USERNAME", username)
    );
  }

  checkUniqueEmail(email: string): Observable<any> {
    return this.apiService.get(
      this.urlService.generate("CHECK_UNIQUE_EMAIL", email)
    );
  }
}

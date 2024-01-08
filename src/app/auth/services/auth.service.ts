import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User, TokenResponse } from "../store/auth.models";
import { ApiService } from "../../core/services/api.service";
import { UrlService } from "../../core/services/url.service";
import { API } from "src/app/core/constants/http.constants";

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

  public register(user: User): Observable<any> {
    return this.apiService.post(
      this.urlService.generate(API.AUTH_REGISTER),
      user
    );
  }

  public login(user: User): Observable<any> {
    return this.apiService
      .post(this.urlService.generate(API.AUTH_LOGIN), user)
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

  public sendResetPasswordEmail(body: {
    email: string;
    preferredLanguage: string;
  }): Observable<any> {
    return this.apiService.get(
      this.urlService.generate(API.AUTH_SEND_RESET_PASSWORD_EMAIL, body)
    );
  }

  public resetPassword(token: string, password: string): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate(API.AUTH_RESET_PASSWORD),
      { token, password }
    );
  }

  public getGithubAuthPage(): Observable<string> {
    return this.apiService.get(
      this.urlService.generate(API.AUTH_GITHUB_AUTH_PAGE)
    );
  }

  public getGithubAccessToken(auth_code: string): Observable<any> {
    return this.apiService.post(
      this.urlService.generate(API.AUTH_GITHUB_ACCESS_TOKEN),
      {
        code: auth_code,
      }
    );
  }

  public githubLogin(): Observable<any> {
    return this.apiService
      .get(this.urlService.generate(API.AUTH_GITHUB_LOGIN))
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

  public githubUpdateExistingUser(userId: string): Observable<any> {
    return this.apiService.get(
      this.urlService.generate(API.AUTH_GITHUB_UPDATE_EXISTING_USER, userId)
    );
  }

  checkUniqueUsername(username: string): Observable<any> {
    return this.apiService.get(
      this.urlService.generate(API.AUTH_CHECK_UNIQUE_USERNAME, username)
    );
  }

  checkUniqueEmail(email: string): Observable<any> {
    return this.apiService.get(
      this.urlService.generate(API.AUTH_CHECK_UNIQUE_EMAIL, email)
    );
  }

  logout(): Observable<any> {
    return this.apiService.get(this.urlService.generate(API.AUTH_LOGOUT));
  }

  clearUserData(): void {
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
}

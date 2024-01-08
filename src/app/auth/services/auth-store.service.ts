import { Injectable } from "@angular/core";
import * as authActions from "../../auth/store/auth.actions";
import * as fromAuth from "../../auth/store/auth.reducer";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class AuthStoreService {
  constructor(private store: Store<fromAuth.Auth>) {}

  register(userDetails: any) {
    this.store.dispatch({
      type: authActions.REGISTER,
      userDetails,
    });
  }

  login(userDetails: any) {
    this.store.dispatch({
      type: authActions.LOGIN,
      userDetails,
    });
  }

  sendPasswordResetEmail(body: { email: string; preferredLanguage: string }) {
    this.store.dispatch({
      type: authActions.SEND_RESET_PASSWORD_EMAIL,
      body,
    });
  }

  resetPassword(token: string, password: string) {
    this.store.dispatch({
      type: authActions.RESET_PASSWORD,
      token,
      password,
    });
  }

  githubLogin() {
    this.store.dispatch({
      type: authActions.GITHUB_LOGIN,
    });
  }

  githubUpdateExistingUser(userId: string) {
    this.store.dispatch({
      type: authActions.GITHUB_UPDATE_EXISTING_USER,
      userId,
    });
  }

  logout() {
    this.store.dispatch({
      type: authActions.LOGOUT,
    });
  }
}

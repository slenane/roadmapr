import { Injectable } from "@angular/core";
import * as authActions from "../../auth/store/auth.actions";
import * as authSelectors from "../store/auth.selectors";
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

    return this.store.select(authSelectors.registrationSuccessful);
  }

  login(userDetails: any) {
    this.store.dispatch({
      type: authActions.LOGIN,
      userDetails,
    });
  }

  githubLogin() {
    this.store.dispatch({
      type: authActions.GITHUB_LOGIN,
    });
  }

  logout() {
    this.store.dispatch({
      type: authActions.LOGOUT,
    });
  }
}

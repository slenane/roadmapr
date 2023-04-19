import { Injectable } from "@angular/core";
import * as AuthActions from "../store/auth.actions";
import * as fromAuth from "../store/auth.reducer";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class AuthStoreService {
  constructor(private store: Store<fromAuth.State>) {}

  register(userDetails: any) {
    this.store.dispatch({
      type: AuthActions.REGISTER,
      userDetails,
    });
  }
}

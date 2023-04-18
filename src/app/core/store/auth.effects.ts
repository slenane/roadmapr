import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, switchMap, catchError, tap } from "rxjs/operators";

import { AuthService } from "../services/auth.service";

import {
  AuthActionTypes,
  Register,
  RegisterSuccess,
  RegisterError,
  Login,
  LoginSuccess,
  LoginError,
  LogoutError,
} from "./auth.actions";

import { TokenPayload, User } from "./auth.models";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.REGISTER),
      switchMap((token: TokenPayload) =>
        this.authService.register(token).pipe(
          map((payload) => new RegisterSuccess(payload)),
          catchError((error) => of(new RegisterError(error)))
        )
      )
    )
  );

  //   @Effect()
  //   Signup: Observable<Action> = this.actions.pipe(
  //     ofType<Signup>(AuthActionTypes.SIGNUP),
  //     switchMap((action) => {
  //       return this.authService.userSignup(action.formData).pipe(
  //         map((payload) => new SignupComplete(payload)),
  //         catchError((error) => of(new SignupError(error)))
  //       );
  //     })
  //   );

  //   @Effect()
  //   Login: Observable<Action> = this.actions.pipe(
  //     ofType<Login>(AuthActionTypes.LOGIN),
  //     switchMap((action) => {
  //       return this.authService.userLogin(action.formData).pipe(
  //         map((user: User) => new LoginComplete(user)),
  //         catchError((error) => of(new LoginError(error)))
  //       );
  //     })
  //   );

  //   @Effect({ dispatch: false })
  //   logout = this.actions.pipe(
  //     ofType(AuthActionTypes.LOGOUT),
  //     tap(() => {
  //       sessionStorage.removeItem("token");
  //       sessionStorage.removeItem("isAdmin");
  //       this.authService.updateNavList("logout");
  //       this.router.navigate(["/"]);
  //     }),
  //     catchError((error) => of(new LogoutError(error)))
  //   );

  //   @Effect({ dispatch: false })
  //   loginSuccess = this.actions.pipe(
  //     ofType(AuthActionTypes.LOGIN_COMPLETE),
  //     tap(() => {
  //       this.authService.updateNavList();
  //       return this.router.navigate(["/dashboard"]);
  //     })
  //   );

  //   @Effect({ dispatch: false })
  //   signupSuccess = this.actions.pipe(
  //     ofType(AuthActionTypes.SIGNUP_COMPLETE),
  //     tap(() => {
  //       this.authService.updateNavList();
  //       return this.router.navigate(["/dashboard"]);
  //     })
  //   );
}

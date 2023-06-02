import { Injectable } from "@angular/core";
// import { Action } from "@ngrx/store";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import * as authActions from "./auth.actions";
// import { TokenPayload, User } from "./auth.models";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  register$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(authActions.REGISTER),
      switchMap(({ userDetails }) => this.authService.register(userDetails)),
      map((payload) => {
        this.router.navigateByUrl("/profile");
        return authActions.RegisterSuccess(payload);
      }),
      catchError((error) => of(authActions.RegisterError(error)))
    )
  );

  login$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(authActions.LOGIN),
      switchMap(({ userDetails }) => this.authService.login(userDetails)),
      map((payload) => {
        this.router.navigateByUrl("/profile");
        return authActions.LoginSuccess(payload);
      }),
      catchError((error) => of(authActions.LoginError(error)))
    )
  );
}

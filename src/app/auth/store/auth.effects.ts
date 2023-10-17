import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import * as authActions from "./auth.actions";
import { ThemeService } from "src/app/core/services/theme.service";
import { TranslateService } from "@ngx-translate/core";
import { ROUTES } from "src/app/core/constants/routes.constants";
import { ProfileService } from "src/app/profile/services/profile.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    private translateService: TranslateService,
    private profileService: ProfileService,
    private snackBar: MatSnackBar
  ) {}

  register$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(authActions.REGISTER),
      switchMap(({ userDetails }) =>
        this.authService.register(userDetails).pipe(
          map(() => authActions.RegisterSuccess()),
          catchError((error) => {
            this.snackBar.open(error.error, "Dismiss", {
              duration: 10000,
              panelClass: ["snackbar-error"],
            });
            return of(authActions.RegisterError());
          })
        )
      )
    )
  );

  login$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(authActions.LOGIN),
      switchMap(({ userDetails }) =>
        this.authService.login(userDetails).pipe(
          map((payload) => {
            this.setUserPreferences(payload.user);
            this.redirectUser(payload.user);
            return authActions.LoginSuccess(payload);
          }),
          catchError((error) => {
            this.snackBar.open(error.error, "Dismiss", {
              duration: 10000,
              panelClass: ["snackbar-error"],
            });
            return of(authActions.LoginError());
          })
        )
      )
    )
  );

  githubLogin$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(authActions.GITHUB_LOGIN),
      switchMap(() =>
        this.authService.githubLogin().pipe(
          map((payload) => {
            this.setUserPreferences(payload.user);
            this.redirectUser(payload.user);
            return authActions.GithubLoginSuccess({ payload });
          }),
          catchError((error) => {
            this.snackBar.open(error.error, "Dismiss", {
              duration: 10000,
              panelClass: ["snackbar-error"],
            });
            return of(authActions.GithubLoginError());
          })
        )
      )
    )
  );

  githubUpdateExistingUser$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(authActions.GITHUB_UPDATE_EXISTING_USER),
      switchMap(({ userId }) =>
        this.authService.githubUpdateExistingUser(userId).pipe(
          map(() => {
            this.snackBar.open("GitHub Linked Successfully", "Dismiss", {
              duration: 5000,
            });
            this.router.navigateByUrl(ROUTES.SETTINGS);
            return authActions.GithubUpdateExistingUserSuccess();
          }),
          catchError((error) => {
            this.snackBar.open(error.error, "Dismiss", {
              duration: 10000,
              panelClass: ["snackbar-error"],
            });
            this.router.navigateByUrl(ROUTES.SETTINGS);
            return of(authActions.GithubUpdateExistingUserError());
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.LOGOUT),
      map(() => this.authService.logout()),
      map(() => {
        this.router.navigateByUrl(ROUTES.LOGIN);
        return authActions.LogoutSuccess();
      }),
      catchError((error) => {
        return of(authActions.LogoutError(error));
      })
    )
  );

  setUserPreferences(user: any) {
    if (user.theme) {
      this.themeService.updateTheme(user.theme);
    }
    if (user.preferredLanguage) {
      this.translateService.use(user.preferredLanguage);
    }
  }

  redirectUser(user: any) {
    if (this.profileService.userBasicDetailsProvided(user)) {
      this.router.navigateByUrl(ROUTES.DASHBOARD);
    } else {
      this.router.navigateByUrl(ROUTES.WELCOME);
    }
  }
}

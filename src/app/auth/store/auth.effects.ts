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
import { AlertsService } from "src/app/shared/services/alerts.service";
import { DARK_THEME } from "src/app/core/constants/theme.constants";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    private translateService: TranslateService,
    private profileService: ProfileService,
    private alertsService: AlertsService
  ) {}

  register$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(authActions.REGISTER),
      switchMap(({ userDetails }) =>
        this.authService.register(userDetails).pipe(
          map(() => authActions.RegisterSuccess()),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
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
            this.alertsService.errorAlert(error.error);
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
            this.alertsService.errorAlert(error.error);
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
          map(({ user, successMessage }) => {
            this.alertsService.successAlert(successMessage);
            this.router.navigateByUrl(ROUTES.SETTINGS);
            return authActions.GithubUpdateExistingUserSuccess({
              payload: user,
            });
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
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
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => {
            this.authService.clearUserData();
            this.themeService.updateTheme(DARK_THEME);
            this.router.navigateByUrl(ROUTES.LOGIN);
            return authActions.LogoutSuccess();
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(authActions.LogoutError(error));
          })
        )
      )
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

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { SettingsService } from "../services/settings.service";
import * as settingsActions from "./settings.actions";
import { Settings } from "./settings.models";
import { AuthService } from "src/app/auth/services/auth.service";
import { Router } from "@angular/router";
import { ROUTES } from "src/app/core/constants/routes.constants";
import { AlertsService } from "src/app/shared/services/alerts.service";

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private settingsService: SettingsService,
    private alertsService: AlertsService,
    private router: Router,
    private authService: AuthService
  ) {}

  getSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsActions.GetSettings),
      switchMap(() =>
        this.settingsService.getSettings().pipe(
          map((payload: Settings) =>
            settingsActions.GetSettingsSuccess({ payload })
          ),
          catchError((error) => of(settingsActions.GetSettingsError(error)))
        )
      )
    )
  );

  updateSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsActions.UpdateSettings),
      switchMap(({ id, data }) =>
        this.settingsService.updateSettings(id, data).pipe(
          map(({ settings, successMessage }) => {
            this.alertsService.successAlert(successMessage);
            return settingsActions.UpdateSettingsSuccess({ payload: settings });
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(settingsActions.UpdateSettingsError(error));
          })
        )
      )
    )
  );

  removeGithub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsActions.RemoveGithub),
      switchMap(({ id }) =>
        this.settingsService.removeGithub(id).pipe(
          map(({ settings, successMessage }) => {
            this.alertsService.successAlert(successMessage);
            return settingsActions.RemoveGithubSuccess({ payload: settings });
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(settingsActions.RemoveGithubError(error));
          })
        )
      )
    )
  );

  updateEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsActions.UpdateEmail),
      switchMap((payload: any) =>
        this.settingsService.updateEmail(payload.id, payload.body).pipe(
          map(({ successMessage, successValue }) => {
            this.alertsService.successAlert(successMessage, successValue);
            return settingsActions.UpdateEmailSuccess();
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(settingsActions.UpdateEmailError());
          })
        )
      )
    )
  );

  updatePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsActions.UpdatePassword),
      switchMap((payload: any) =>
        this.settingsService.updatePassword(payload.id, payload.password).pipe(
          map(({ settings, successMessage }) => {
            this.alertsService.successAlert(successMessage);
            return settingsActions.UpdatePasswordSuccess({ payload: settings });
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(settingsActions.UpdatePasswordError(error));
          })
        )
      )
    )
  );

  updateExistingPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsActions.UpdateExistingPassword),
      switchMap((payload: any) =>
        this.settingsService
          .updateExistingPassword(payload.id, payload.passwordConfig)
          .pipe(
            map(({ settings, successMessage }) => {
              this.alertsService.successAlert(successMessage);
              return settingsActions.UpdateExistingPasswordSuccess({
                payload: settings,
              });
            }),
            catchError((error) => {
              this.alertsService.errorAlert(error.error);
              return of(settingsActions.UpdateExistingPasswordError(error));
            })
          )
      )
    )
  );

  DeleteAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsActions.DeleteAccount),
      switchMap(() =>
        this.settingsService.deleteAccount().pipe(
          map(({ successMessage }) => {
            this.alertsService.successAlert(successMessage);
            return this.authService.logout();
          }),
          map(() => {
            this.router.navigateByUrl(ROUTES.LOGIN);
            return settingsActions.DeleteAccountSuccess();
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(settingsActions.DeleteAccountError(error));
          })
        )
      )
    )
  );
}

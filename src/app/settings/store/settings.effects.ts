import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { SettingsService } from "../services/settings.service";
import * as settingsActions from "./settings.actions";
import { Settings } from "./settings.models";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "src/app/auth/services/auth.service";
import { Router } from "@angular/router";
import { ROUTES } from "src/app/core/constants/routes.constants";

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  getSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsActions.GET_SETTINGS),
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
      ofType(settingsActions.UPDATE_SETTINGS),
      switchMap(({ id, data }) =>
        this.settingsService.updateSettings(id, data).pipe(
          map(({ settings, successMessage }) => {
            this.snackBar.open(successMessage, "Dismiss", {
              duration: 5000,
            });
            return settingsActions.UpdateSettingsSuccess({ payload: settings });
          }),
          catchError((error) => {
            this.snackBar.open(error.error, "Dismiss", {
              duration: 10000,
              panelClass: ["snackbar-error"],
            });
            return of(settingsActions.UpdateSettingsError(error));
          })
        )
      )
    )
  );

  updatePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsActions.UPDATE_PASSWORD),
      switchMap((payload: any) =>
        this.settingsService.updatePassword(payload.id, payload.password).pipe(
          map(({ settings, successMessage }) => {
            this.snackBar.open(successMessage, "Dismiss", {
              duration: 5000,
            });
            return settingsActions.UpdatePasswordSuccess({ payload: settings });
          }),
          catchError((error) => {
            this.snackBar.open(error.error, "Dismiss", {
              duration: 10000,
              panelClass: ["snackbar-error"],
            });
            return of(settingsActions.UpdatePasswordError(error));
          })
        )
      )
    )
  );

  DeleteAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsActions.DELETE_ACCOUNT),
      switchMap(() =>
        this.settingsService.deleteAccount().pipe(
          map(({ successMessage }) => {
            this.snackBar.open(successMessage, "Dismiss", {
              duration: 5000,
            });
            return this.authService.logout();
          }),
          map(() => {
            this.router.navigateByUrl(ROUTES.LOGIN);
            return settingsActions.DeleteAccountSuccess();
          }),
          catchError((error) => {
            this.snackBar.open(error.error, "Dismiss", {
              duration: 10000,
              panelClass: ["snackbar-error"],
            });
            return of(settingsActions.DeleteAccountError(error));
          })
        )
      )
    )
  );
}

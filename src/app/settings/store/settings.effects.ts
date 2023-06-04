import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { SettingsService } from "../services/settings.service";
import * as settingsActions from "./settings.actions";
import { Settings } from "./settings.models";

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private settingsService: SettingsService
  ) {}

  getSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsActions.GET_SETTINGS),
      switchMap((payload: any) => {
        return this.settingsService.getSettings(payload.id);
      }),
      map((payload: Settings) => {
        return settingsActions.GetSettingsSuccess({ payload });
      }),
      catchError((error) => of(settingsActions.GetSettingsError(error)))
    )
  );

  updateSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsActions.UPDATE_SETTINGS),
      switchMap((payload: any) => {
        return this.settingsService.updateSettings(payload.id, payload.data);
      }),
      map((payload: Settings) => {
        return settingsActions.GetSettingsSuccess({ payload });
      }),
      catchError((error) => of(settingsActions.GetSettingsError(error)))
    )
  );
}

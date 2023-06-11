import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { ProfileService } from "../services/profile.service";
import * as profileActions from "./profile.actions";
import { Profile } from "./profile.models";

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.GET_PROFILE),
      switchMap(() => {
        return this.profileService.getProfile();
      }),
      map((payload: Profile) => {
        return profileActions.GetProfileSuccess({ payload });
      }),
      catchError((error) => of(profileActions.GetProfileError(error)))
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.UPDATE_PROFILE),
      switchMap((payload: any) => {
        return this.profileService.updateProfile(payload.id, payload.data);
      }),
      map((payload: Profile) => {
        return profileActions.GetProfileSuccess({ payload });
      }),
      catchError((error) => of(profileActions.GetProfileError(error)))
    )
  );
}

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { ProfileService } from "../services/profile.service";
import * as profileActions from "./profile.actions";
import { Profile } from "./profile.models";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private snackBar: MatSnackBar
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
        this.snackBar.open("Profile Updated", "Dismiss", {
          duration: 5000,
        });
        return profileActions.GetProfileSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Profile Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(profileActions.GetProfileError(error));
      })
    )
  );
}

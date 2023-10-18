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
      switchMap(() =>
        this.profileService.getProfile().pipe(
          map((payload: Profile) =>
            profileActions.GetProfileSuccess({ payload })
          ),
          catchError((error) => of(profileActions.GetProfileError(error)))
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.UPDATE_PROFILE),
      switchMap(({ id, data }) =>
        this.profileService.updateProfile(id, data).pipe(
          map(({ user, successMessage }) => {
            this.snackBar.open(successMessage, "Dismiss", {
              duration: 5000,
            });
            return profileActions.UpdateProfileSuccess({ payload: user });
          }),
          catchError((error) => {
            this.snackBar.open(error.error, "Dismiss", {
              duration: 10000,
              panelClass: ["snackbar-error"],
            });
            return of(profileActions.UpdateProfileError());
          })
        )
      )
    )
  );

  updateProfileImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.UPDATE_PROFILE_IMAGE),
      switchMap(({ data }) =>
        this.profileService.updateProfileImage(data).pipe(
          map(({ user, successMessage }) => {
            this.snackBar.open(successMessage, "Dismiss", {
              duration: 5000,
            });
            return profileActions.UpdateProfileImageSuccess({ payload: user });
          }),
          catchError((error) => {
            this.snackBar.open(error.error, "Dismiss", {
              duration: 10000,
              panelClass: ["snackbar-error"],
            });
            return of(profileActions.UpdateProfileImageError());
          })
        )
      )
    )
  );
}

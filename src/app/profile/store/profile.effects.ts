import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { ProfileService } from "../services/profile.service";
import * as profileActions from "./profile.actions";
import { Profile } from "./profile.models";
import { AlertsService } from "src/app/shared/services/alerts.service";

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private alertsService: AlertsService
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
            this.alertsService.successAlert(successMessage);
            return profileActions.UpdateProfileSuccess({ payload: user });
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
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
            this.alertsService.successAlert(successMessage);
            return profileActions.UpdateProfileImageSuccess({ payload: user });
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(profileActions.UpdateProfileImageError());
          })
        )
      )
    )
  );
}

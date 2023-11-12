import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { ExperienceService } from "../services/experience.service";
import * as experienceActions from "./experience.actions";
import { Experience } from "./experience.models";
import { AlertsService } from "src/app/shared/services/alerts.service";

@Injectable()
export class ExperienceEffects {
  constructor(
    private actions$: Actions,
    private experienceService: ExperienceService,
    private alertsService: AlertsService
  ) {}

  getExperience$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(experienceActions.GET_EXPERIENCE),
      switchMap((payload: any) =>
        this.experienceService.getExperience(payload.id).pipe(
          map((payload: Experience) =>
            experienceActions.GetExperienceSuccess({ payload })
          ),
          catchError((error) => of(experienceActions.GetExperienceError(error)))
        )
      )
    )
  );

  createExperienceItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(experienceActions.CREATE_EXPERIENCE_ITEM),
      switchMap(({ experienceId, data }) =>
        this.experienceService.createExperienceItem(experienceId, data).pipe(
          map(({ experience, successMessage }) => {
            this.alertsService.successAlert(successMessage);
            return experienceActions.CreateExperienceItemSuccess({
              payload: experience,
            });
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(experienceActions.CreateExperienceItemError(error));
          })
        )
      )
    )
  );

  updateExperienceItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(experienceActions.UPDATE_EXPERIENCE_ITEM),
      switchMap((payload: any) =>
        this.experienceService
          .updateExperienceItem(payload.data.experience, payload.data)
          .pipe(
            map(({ experience, successMessage }) => {
              this.alertsService.successAlert(successMessage);
              return experienceActions.UpdateExperienceItemSuccess({
                payload: experience,
              });
            }),
            catchError((error) => {
              this.alertsService.errorAlert(error.error);
              return of(experienceActions.UpdateExperienceItemError(error));
            })
          )
      )
    )
  );

  bulkUpdateExperienceItems$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(experienceActions.BULK_UPDATE_EXPERIENCE_ITEMS),
      switchMap(({ experienceId, data }) =>
        this.experienceService
          .bulkUpdateExperienceItems(experienceId, data)
          .pipe(
            map(({ experience, successMessage }) => {
              this.alertsService.successAlert(successMessage);
              return experienceActions.BulkUpdateExperienceItemsSuccess({
                payload: experience,
              });
            }),
            catchError((error) => {
              this.alertsService.errorAlert(error.error);
              return of(
                experienceActions.BulkUpdateExperienceItemsError(error)
              );
            })
          )
      )
    )
  );

  removeExperienceItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(experienceActions.REMOVE_EXPERIENCE_ITEM),
      switchMap((payload: any) =>
        this.experienceService
          .removeExperienceItem(payload.data.experience, payload.data)
          .pipe(
            map(({ experience, successMessage }) => {
              this.alertsService.successAlert(successMessage);
              return experienceActions.RemoveExperienceItemSuccess({
                payload: experience,
              });
            }),
            catchError((error) => {
              this.alertsService.errorAlert(error.error);
              return of(experienceActions.RemoveExperienceItemError(error));
            })
          )
      )
    )
  );
}

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { EducationService } from "../services/education.service";
import * as educationActions from "./education.actions";
import { Education } from "./education.models";
import { AlertsService } from "src/app/shared/services/alerts.service";

@Injectable()
export class EducationEffects {
  constructor(
    private actions$: Actions,
    private educationService: EducationService,
    private alertsService: AlertsService
  ) {}

  getEducation$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(educationActions.GET_EDUCATION),
      switchMap((payload: any) =>
        this.educationService.getEducation(payload.id).pipe(
          map((payload: Education) =>
            educationActions.GetEducationSuccess({ payload })
          ),
          catchError((error) => of(educationActions.GetEducationError(error)))
        )
      )
    )
  );

  createEducationItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(educationActions.CREATE_EDUCATION_ITEM),
      switchMap(({ educationId, data }) =>
        this.educationService.createEducationItem(educationId, data).pipe(
          map(({ education, successMessage }) => {
            this.alertsService.successAlert(successMessage);
            return educationActions.CreateEducationItemSuccess({
              payload: education,
            });
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(educationActions.CreateEducationItemError(error));
          })
        )
      )
    )
  );

  updateEducationItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(educationActions.UPDATE_EDUCATION_ITEM),
      switchMap((payload: any) =>
        this.educationService
          .updateEducationItem(payload.data.education, payload.data)
          .pipe(
            map(({ education, successMessage }) => {
              this.alertsService.successAlert(successMessage);
              return educationActions.UpdateEducationItemSuccess({
                payload: education,
              });
            }),
            catchError((error) => {
              this.alertsService.errorAlert(error.error);
              return of(educationActions.UpdateEducationItemError(error));
            })
          )
      )
    )
  );

  bulkUpdateEducationItems$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(educationActions.BULK_UPDATE_EDUCATION_ITEMS),
      switchMap(({ educationId, data }) =>
        this.educationService.bulkUpdateEducationItems(educationId, data).pipe(
          map(({ education }) => {
            return educationActions.BulkUpdateEducationItemsSuccess({
              payload: education,
            });
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(educationActions.BulkUpdateEducationItemsError(error));
          })
        )
      )
    )
  );

  removeEducationItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(educationActions.REMOVE_EDUCATION_ITEM),
      switchMap((item: any) =>
        this.educationService
          .removeEducationItem(item.data.education, item.data)
          .pipe(
            map(({ education, successMessage }) => {
              this.alertsService.successAlert(successMessage);
              return educationActions.RemoveEducationItemSuccess({
                payload: education,
              });
            }),
            catchError((error) => {
              this.alertsService.errorAlert(error.error);
              return of(educationActions.RemoveEducationItemError(error));
            })
          )
      )
    )
  );
}

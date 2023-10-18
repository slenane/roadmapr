import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { EmploymentService } from "../services/employment.service";
import * as employmentActions from "./employment.actions";
import { Employment } from "./employment.models";
import { AlertsService } from "src/app/shared/services/alerts.service";

@Injectable()
export class EmploymentEffects {
  constructor(
    private actions$: Actions,
    private employmentService: EmploymentService,
    private alertsService: AlertsService
  ) {}

  getEmployment$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(employmentActions.GET_EMPLOYMENT),
      switchMap((payload: any) =>
        this.employmentService.getEmployment(payload.id).pipe(
          map((payload: Employment) =>
            employmentActions.GetEmploymentSuccess({ payload })
          ),
          catchError((error) => of(employmentActions.GetEmploymentError(error)))
        )
      )
    )
  );

  createEmploymentItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(employmentActions.CREATE_EMPLOYMENT_ITEM),
      switchMap(({ employmentId, data }) =>
        this.employmentService.createEmploymentItem(employmentId, data).pipe(
          map(({ employment, successMessage }) => {
            this.alertsService.successAlert(successMessage);
            return employmentActions.CreateEmploymentItemSuccess({
              payload: employment,
            });
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(employmentActions.CreateEmploymentItemError(error));
          })
        )
      )
    )
  );

  updateEmploymentItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(employmentActions.UPDATE_EMPLOYMENT_ITEM),
      switchMap((payload: any) =>
        this.employmentService
          .updateEmploymentItem(payload.data.employment, payload.data)
          .pipe(
            map(({ employment, successMessage }) => {
              this.alertsService.successAlert(successMessage);
              return employmentActions.UpdateEmploymentItemSuccess({
                payload: employment,
              });
            }),
            catchError((error) => {
              this.alertsService.errorAlert(error.error);
              return of(employmentActions.UpdateEmploymentItemError(error));
            })
          )
      )
    )
  );

  bulkUpdateEmploymentItems$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(employmentActions.BULK_UPDATE_EMPLOYMENT_ITEMS),
      switchMap(({ employmentId, data }) =>
        this.employmentService
          .bulkUpdateEmploymentItems(employmentId, data)
          .pipe(
            map(({ employment, successMessage }) => {
              this.alertsService.successAlert(successMessage);
              return employmentActions.BulkUpdateEmploymentItemsSuccess({
                payload: employment,
              });
            }),
            catchError((error) => {
              this.alertsService.errorAlert(error.error);
              return of(
                employmentActions.BulkUpdateEmploymentItemsError(error)
              );
            })
          )
      )
    )
  );

  removeEmploymentItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(employmentActions.REMOVE_EMPLOYMENT_ITEM),
      switchMap((payload: any) =>
        this.employmentService
          .removeEmploymentItem(payload.data.employment, payload.data)
          .pipe(
            map(({ employment, successMessage }) => {
              this.alertsService.successAlert(successMessage);
              return employmentActions.RemoveEmploymentItemSuccess({
                payload: employment,
              });
            }),
            catchError((error) => {
              this.alertsService.errorAlert(error.error);
              return of(employmentActions.RemoveEmploymentItemError(error));
            })
          )
      )
    )
  );
}

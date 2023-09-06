import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { EmploymentService } from "../services/employment.service";
import * as employmentActions from "./employment.actions";
import { Employment } from "./employment.models";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class EmploymentEffects {
  constructor(
    private actions$: Actions,
    private employmentService: EmploymentService,
    private snackBar: MatSnackBar
  ) {}

  getEmployment$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(employmentActions.GET_EMPLOYMENT),
      switchMap((payload: any) => {
        return this.employmentService.getEmployment(payload.id);
      }),
      map((payload: Employment) => {
        return employmentActions.GetEmploymentSuccess({ payload });
      }),
      catchError((error) => of(employmentActions.GetEmploymentError(error)))
    )
  );

  createEmploymentItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(employmentActions.CREATE_EMPLOYMENT_ITEM),
      switchMap(({ employmentId, data }) => {
        return this.employmentService.createEmploymentItem(employmentId, data);
      }),
      map((payload) => {
        this.snackBar.open("Employment Updated", "Dismiss", {
          duration: 5000,
        });
        return employmentActions.CreateEmploymentItemSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Employment Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(employmentActions.CreateEmploymentItemError(error));
      })
    )
  );

  updateEmploymentItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(employmentActions.UPDATE_EMPLOYMENT_ITEM),
      switchMap((payload: any) => {
        return this.employmentService.updateEmploymentItem(
          payload.data.employment,
          payload.data
        );
      }),
      map((payload) => {
        this.snackBar.open("Employment Updated", "Dismiss", {
          duration: 5000,
        });
        return employmentActions.UpdateEmploymentItemSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Employment Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(employmentActions.UpdateEmploymentItemError(error));
      })
    )
  );

  bulkUpdateEmploymentItems$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(employmentActions.BULK_UPDATE_EMPLOYMENT_ITEMS),
      switchMap(({ employmentId, data }) => {
        return this.employmentService.bulkUpdateEmploymentItems(
          employmentId,
          data
        );
      }),
      map((payload) => {
        this.snackBar.open("Employment Items Updated", "Dismiss", {
          duration: 5000,
        });
        return employmentActions.BulkUpdateEmploymentItemsSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Employment Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(employmentActions.BulkUpdateEmploymentItemsError(error));
      })
    )
  );

  removeEmploymentItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(employmentActions.REMOVE_EMPLOYMENT_ITEM),
      switchMap((payload: any) => {
        return this.employmentService.removeEmploymentItem(
          payload.data.employment,
          payload.data
        );
      }),
      map((payload) => {
        this.snackBar.open("Employment Removed", "Dismiss", {
          duration: 5000,
        });
        return employmentActions.RemoveEmploymentItemSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Employment Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(employmentActions.RemoveEmploymentItemError(error));
      })
    )
  );
}

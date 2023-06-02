import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { EmploymentService } from "../services/employment.service";
import * as employmentActions from "./employment.actions";
import { Employment } from "./employment.models";

@Injectable()
export class EmploymentEffects {
  constructor(
    private actions$: Actions,
    private employmentService: EmploymentService
  ) {}

  getEmployment$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(employmentActions.GET_EMPLOYMENT),
      switchMap((payload: any) => {
        console.log(payload);
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
        console.log(payload);
        return employmentActions.CreateEmploymentItemSuccess({ payload });
      }),
      catchError((error) =>
        of(employmentActions.CreateEmploymentItemError(error))
      )
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
        return employmentActions.UpdateEmploymentItemSuccess({ payload });
      }),
      catchError((error) =>
        of(employmentActions.UpdateEmploymentItemError(error))
      )
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
        return employmentActions.RemoveEmploymentItemSuccess({ payload });
      }),
      catchError((error) =>
        of(employmentActions.RemoveEmploymentItemError(error))
      )
    )
  );
}

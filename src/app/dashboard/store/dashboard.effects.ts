import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { DashboardService } from "../services/dashboard.service";
import * as dashboardActions from "./dashboard.actions";
import { Dashboard } from "./dashboard.models";

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}

  getDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardActions.GET_DASHBOARD),
      switchMap(() => {
        return this.dashboardService.getDashboard();
      }),
      map((payload: Dashboard) => {
        return dashboardActions.GetDashboardSuccess({ payload });
      }),
      catchError((error) => of(dashboardActions.GetDashboardError(error)))
    )
  );
}

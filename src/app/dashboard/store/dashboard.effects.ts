import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { DashboardService } from "../services/dashboard.service";
import * as dashboardActions from "./dashboard.actions";
import { Dashboard } from "./dashboard.models";
import { AlertsService } from "src/app/shared/services/alerts.service";

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private alertsService: AlertsService
  ) {}

  getDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardActions.GET_DASHBOARD),
      switchMap(() => {
        return this.dashboardService.getDashboard().pipe(
          map((payload: Dashboard) =>
            dashboardActions.GetDashboardSuccess({ payload })
          ),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(dashboardActions.GetDashboardError(error));
          })
        );
      })
    )
  );
}

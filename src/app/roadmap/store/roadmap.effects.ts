import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { RoadmapService } from "../services/roadmap.service";
import * as roadmapActions from "./roadmap.actions";
import { Roadmap } from "./roadmap.models";
import { AlertsService } from "src/app/shared/services/alerts.service";

@Injectable()
export class RoadmapEffects {
  constructor(
    private actions$: Actions,
    private roadmapService: RoadmapService,
    private alertsService: AlertsService
  ) {}

  getRoadmap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(roadmapActions.GET_ROADMAP),
      switchMap(() => {
        return this.roadmapService.getRoadmap().pipe(
          map((payload: Roadmap) =>
            roadmapActions.GetRoadmapSuccess({ payload })
          ),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(roadmapActions.GetRoadmapError(error));
          })
        );
      })
    )
  );

  updateRoadmap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(roadmapActions.UPDATE_ROADMAP),
      switchMap(({ data }) =>
        this.roadmapService.updateRoadmap(data).pipe(
          map(({ roadmap, successMessage }) => {
            this.alertsService.successAlert(successMessage);
            return roadmapActions.UpdateRoadmapSuccess({ payload: roadmap });
          }),
          catchError((error) => {
            this.alertsService.errorAlert(error.error);
            return of(roadmapActions.UpdateRoadmapError());
          })
        )
      )
    )
  );
}

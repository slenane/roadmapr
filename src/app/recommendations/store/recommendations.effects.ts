import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { RecommendationsService } from "../services/recommendations.service";
import * as recommendationsActions from "./recommendations.actions";
import { Recommendation, RemoteJob } from "./recommendations.models";

@Injectable()
export class RecommendationsEffects {
  constructor(
    private actions$: Actions,
    private recommendationsService: RecommendationsService
  ) {}

  getRecommendations$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(recommendationsActions.GET_RECOMMENDATIONS),
      switchMap(() =>
        this.recommendationsService.getRecommendations().pipe(
          map((payload: Recommendation[]) => {
            return recommendationsActions.GetRecommendationsSuccess({
              payload,
            });
          }),
          catchError((error) =>
            of(recommendationsActions.GetRecommendationsError(error))
          )
        )
      )
    )
  );

  getRemoteJobs$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(recommendationsActions.GET_REMOTE_JOBS),
      switchMap(() =>
        this.recommendationsService.getRemoteJobs().pipe(
          map((payload: RemoteJob[]) => {
            return recommendationsActions.GetRemoteJobsSuccess({
              payload,
            });
          }),
          catchError((error) =>
            of(recommendationsActions.GetRemoteJobsError(error))
          )
        )
      )
    )
  );
}

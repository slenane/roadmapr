import { Injectable } from "@angular/core";
// import { Action } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { RoadmapService } from "../services/roadmap.service";
import * as roadmapActions from "./roadmap.actions";
import { Roadmap } from "./roadmap.models";

@Injectable()
export class RoadmapEffects {
  constructor(
    private actions$: Actions,
    private roadmapService: RoadmapService
  ) {}

  getRoadmap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(roadmapActions.GET_ROADMAP),
      switchMap((payload: any) => {
        console.log(payload);
        return this.roadmapService.getRoadmap(payload.id);
      }),
      map((payload: Roadmap) => {
        console.log(payload);
        return roadmapActions.GetRoadmapSuccess({ payload });
      }),
      catchError((error) => of(roadmapActions.GetRoadmapError(error)))
    )
  );
}

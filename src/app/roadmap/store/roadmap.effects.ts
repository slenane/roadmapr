import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, EMPTY } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { RoadmapService } from "../services/roadmap.service";

import {
  RoadmapActionTypes,
  GetRoadmapSuccess,
  //   AddRoadmapItemSuccess,
  //   EditRoadmapItemSuccess,
  //   RemoveRoadmapItemSuccess,
} from "./roadmap.actions";

import { Roadmap } from "./roadmap.models";

@Injectable()
export class RoadmapEffects {
  constructor(
    private actions$: Actions,
    private roadmapService: RoadmapService
  ) {}

  getRoadmap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoadmapActionTypes.GET_ROADMAP),
      mergeMap((id) =>
        this.roadmapService.getRoadmap(id).pipe(
          map((roadmap: Roadmap) => new GetRoadmapSuccess(roadmap)),
          catchError(() => EMPTY)
        )
      )
    )
  );
}

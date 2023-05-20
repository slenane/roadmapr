import { Injectable } from "@angular/core";
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
        return this.roadmapService.getRoadmap(payload.id);
      }),
      map((payload: Roadmap) => {
        return roadmapActions.GetRoadmapSuccess({ payload });
      }),
      catchError((error) => of(roadmapActions.GetRoadmapError(error)))
    )
  );

  createRoadmapItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(roadmapActions.CREATE_ROADMAP_ITEM),
      switchMap(({ roadmapId, data }) => {
        return this.roadmapService.createRoadmapItem(roadmapId, data);
      }),
      map((payload) => {
        return roadmapActions.CreateRoadmapItemSuccess({ payload });
      }),
      catchError((error) => of(roadmapActions.CreateRoadmapItemError(error)))
    )
  );

  updateRoadmapItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(roadmapActions.UPDATE_ROADMAP_ITEM),
      switchMap((payload: any) => {
        return this.roadmapService.updateRoadmapItem(
          payload.data.roadmap,
          payload.data
        );
      }),
      map((payload) => {
        return roadmapActions.UpdateRoadmapItemSuccess({ payload });
      }),
      catchError((error) => of(roadmapActions.UpdateRoadmapItemError(error)))
    )
  );

  removeRoadmapItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(roadmapActions.REMOVE_ROADMAP_ITEM),
      switchMap(({ roadmapId, itemId }) => {
        console.log(itemId);
        return this.roadmapService.removeRoadmapItem(roadmapId, itemId);
      }),
      map((payload) => {
        console.log(payload);
        return roadmapActions.RemoveRoadmapItemSuccess({ payload });
      }),
      catchError((error) => of(roadmapActions.RemoveRoadmapItemError(error)))
    )
  );
}

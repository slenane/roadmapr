import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { RoadmapService } from "../services/roadmap.service";
import * as roadmapActions from "./roadmap.actions";
import { Roadmap } from "./roadmap.models";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class RoadmapEffects {
  constructor(
    private actions$: Actions,
    private roadmapService: RoadmapService,
    private snackBar: MatSnackBar
  ) {}

  getRoadmap$ = createEffect((): any =>
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
        this.snackBar.open("Roadmap Updated", "Dismiss", {
          duration: 5000,
        });
        return roadmapActions.CreateRoadmapItemSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Roadmap Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(roadmapActions.CreateRoadmapItemError(error));
      })
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
        this.snackBar.open("Roadmap Item Updated", "Dismiss", {
          duration: 5000,
        });
        return roadmapActions.UpdateRoadmapItemSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Roadmap Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(roadmapActions.UpdateRoadmapItemError(error));
      })
    )
  );

  removeRoadmapItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(roadmapActions.REMOVE_ROADMAP_ITEM),
      switchMap((payload: any) => {
        return this.roadmapService.removeRoadmapItem(
          payload.data.roadmap,
          payload.data
        );
      }),
      map((payload) => {
        this.snackBar.open("Roadmap Item Removed", "Dismiss", {
          duration: 5000,
        });
        return roadmapActions.RemoveRoadmapItemSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Roadmap Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(roadmapActions.RemoveRoadmapItemError(error));
      })
    )
  );
}

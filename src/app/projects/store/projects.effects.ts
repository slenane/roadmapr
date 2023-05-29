import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { ProjectsService } from "../services/projects.service";
import * as projectActions from "./projects.actions";
import { Projects } from "./projects.models";

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}

  getProject$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(projectActions.GET_PROJECTS),
      switchMap((payload: any) => {
        return this.projectsService.getProjects(payload.id);
      }),
      map((payload: Projects) => {
        return projectActions.GetProjectsSuccess({ payload });
      }),
      catchError((error) => of(projectActions.GetProjectsError(error)))
    )
  );

  createProject$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(projectActions.CREATE_PROJECT),
      switchMap(({ projectsId, data }) => {
        return this.projectsService.createProject(projectsId, data);
      }),
      map((payload) => {
        console.log(payload);
        return projectActions.CreateProjectSuccess({ payload });
      }),
      catchError((error) => of(projectActions.CreateProjectError(error)))
    )
  );

  updateProject$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(projectActions.UPDATE_PROJECT),
      switchMap((payload: any) => {
        return this.projectsService.updateProject(
          payload.data.project,
          payload.data
        );
      }),
      map((payload) => {
        return projectActions.UpdateProjectSuccess({ payload });
      }),
      catchError((error) => of(projectActions.UpdateProjectError(error)))
    )
  );

  removeProject$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(projectActions.REMOVE_PROJECT),
      switchMap((payload: any) => {
        return this.projectsService.removeProject(
          payload.data.project,
          payload.data
        );
      }),
      map((payload) => {
        return projectActions.RemoveProjectSuccess({ payload });
      }),
      catchError((error) => of(projectActions.RemoveProjectError(error)))
    )
  );
}

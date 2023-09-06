import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { ProjectsService } from "../services/projects.service";
import * as projectActions from "./projects.actions";
import { Projects } from "./projects.models";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private snackBar: MatSnackBar
  ) {}

  getProjects$ = createEffect((): any =>
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
        this.snackBar.open("Projects Updated", "Dismiss", {
          duration: 5000,
        });
        return projectActions.CreateProjectSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Project Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(projectActions.CreateProjectError(error));
      })
    )
  );

  updateProject$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(projectActions.UPDATE_PROJECT),
      switchMap((payload: any) => {
        return this.projectsService.updateProject(
          payload.data.projects,
          payload.data
        );
      }),
      map((payload) => {
        this.snackBar.open("Projects Updated", "Dismiss", {
          duration: 5000,
        });
        return projectActions.UpdateProjectSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Project Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(projectActions.UpdateProjectError(error));
      })
    )
  );

  bulkUpdateProjectItems$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(projectActions.BULK_UPDATE_PROJECT_ITEMS),
      switchMap(({ projectsId, data }) => {
        return this.projectsService.bulkUpdateProjectItems(projectsId, data);
      }),
      map((payload) => {
        this.snackBar.open("Project Items Updated", "Dismiss", {
          duration: 5000,
        });
        return projectActions.BulkUpdateProjectItemsSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Project Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(projectActions.BulkUpdateProjectItemsError(error));
      })
    )
  );

  removeProject$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(projectActions.REMOVE_PROJECT),
      switchMap((payload: any) => {
        return this.projectsService.removeProject(
          payload.data.projects,
          payload.data
        );
      }),
      map((payload) => {
        this.snackBar.open("Project Removed", "Dismiss", {
          duration: 5000,
        });
        return projectActions.RemoveProjectSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Project Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(projectActions.RemoveProjectError(error));
      })
    )
  );
}

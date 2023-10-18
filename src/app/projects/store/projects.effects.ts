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
      switchMap((payload: any) =>
        this.projectsService.getProjects(payload.id).pipe(
          map((payload: Projects) =>
            projectActions.GetProjectsSuccess({ payload })
          ),
          catchError((error) => of(projectActions.GetProjectsError(error)))
        )
      )
    )
  );

  createProject$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(projectActions.CREATE_PROJECT),
      switchMap(({ projectsId, data }) =>
        this.projectsService.createProject(projectsId, data).pipe(
          map(({ projects, successMessage }) => {
            this.snackBar.open(successMessage, "Dismiss", {
              duration: 5000,
            });
            return projectActions.CreateProjectSuccess({ payload: projects });
          }),
          catchError((error) => {
            this.snackBar.open(error.error, "Dismiss", {
              duration: 10000,
              panelClass: ["snackbar-error"],
            });
            return of(projectActions.CreateProjectError(error));
          })
        )
      )
    )
  );

  updateProject$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(projectActions.UPDATE_PROJECT),
      switchMap((payload: any) =>
        this.projectsService
          .updateProject(payload.data.projects, payload.data)
          .pipe(
            map(({ projects, successMessage }) => {
              this.snackBar.open(successMessage, "Dismiss", {
                duration: 5000,
              });
              return projectActions.UpdateProjectSuccess({ payload: projects });
            }),
            catchError((error) => {
              this.snackBar.open(error.error, "Dismiss", {
                duration: 10000,
                panelClass: ["snackbar-error"],
              });
              return of(projectActions.UpdateProjectError(error));
            })
          )
      )
    )
  );

  bulkUpdateProjectItems$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(projectActions.BULK_UPDATE_PROJECT_ITEMS),
      switchMap(({ projectsId, data }) =>
        this.projectsService.bulkUpdateProjectItems(projectsId, data).pipe(
          map(({ projects, successMessage }) => {
            this.snackBar.open(successMessage, "Dismiss", {
              duration: 5000,
            });
            return projectActions.BulkUpdateProjectItemsSuccess({
              payload: projects,
            });
          }),
          catchError((error) => {
            this.snackBar.open(error.error, "Dismiss", {
              duration: 10000,
              panelClass: ["snackbar-error"],
            });
            return of(projectActions.BulkUpdateProjectItemsError(error));
          })
        )
      )
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
      map(({ projects, successMessage }) => {
        this.snackBar.open(successMessage, "Dismiss", {
          duration: 5000,
        });
        return projectActions.RemoveProjectSuccess({ payload: projects });
      }),
      catchError((error) => {
        this.snackBar.open(error.error, "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(projectActions.RemoveProjectError(error));
      })
    )
  );
}

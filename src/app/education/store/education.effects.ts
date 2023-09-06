import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { EducationService } from "../services/education.service";
import * as educationActions from "./education.actions";
import { Education } from "./education.models";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class EducationEffects {
  constructor(
    private actions$: Actions,
    private educationService: EducationService,
    private snackBar: MatSnackBar
  ) {}

  getEducation$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(educationActions.GET_EDUCATION),
      switchMap((payload: any) => {
        return this.educationService.getEducation(payload.id);
      }),
      map((payload: Education) => {
        return educationActions.GetEducationSuccess({ payload });
      }),
      catchError((error) => of(educationActions.GetEducationError(error)))
    )
  );

  createEducationItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(educationActions.CREATE_EDUCATION_ITEM),
      switchMap(({ educationId, data }) => {
        return this.educationService.createEducationItem(educationId, data);
      }),
      map((payload) => {
        this.snackBar.open("Education Updated", "Dismiss", {
          duration: 5000,
        });
        return educationActions.CreateEducationItemSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Education Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(educationActions.CreateEducationItemError(error));
      })
    )
  );

  updateEducationItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(educationActions.UPDATE_EDUCATION_ITEM),
      switchMap((payload: any) => {
        return this.educationService.updateEducationItem(
          payload.data.education,
          payload.data
        );
      }),
      map((payload) => {
        this.snackBar.open("Education Item Updated", "Dismiss", {
          duration: 5000,
        });
        return educationActions.UpdateEducationItemSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Education Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(educationActions.UpdateEducationItemError(error));
      })
    )
  );

  bulkUpdateEducationItems$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(educationActions.BULK_UPDATE_EDUCATION_ITEMS),
      switchMap(({ educationId, data }) => {
        return this.educationService.bulkUpdateEducationItems(
          educationId,
          data
        );
      }),
      map((payload) => {
        this.snackBar.open("Education Items Updated", "Dismiss", {
          duration: 5000,
        });
        return educationActions.BulkUpdateEducationItemsSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Education Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(educationActions.BulkUpdateEducationItemsError(error));
      })
    )
  );

  removeEducationItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(educationActions.REMOVE_EDUCATION_ITEM),
      switchMap((payload: any) => {
        return this.educationService.removeEducationItem(
          payload.data.education,
          payload.data
        );
      }),
      map((payload) => {
        this.snackBar.open("Education Item Removed", "Dismiss", {
          duration: 5000,
        });
        return educationActions.RemoveEducationItemSuccess({ payload });
      }),
      catchError((error) => {
        this.snackBar.open("Education Update Error", "Dismiss", {
          duration: 10000,
          panelClass: ["snackbar-error"],
        });
        return of(educationActions.RemoveEducationItemError(error));
      })
    )
  );
}

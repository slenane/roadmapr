import { Injectable } from "@angular/core";
import * as educationActions from "../store/education.actions";
import * as educationSelectors from "../store/education.selectors";
import { Store } from "@ngrx/store";
import { Education } from "../store/education.models";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EducationStoreService {
  constructor(private store: Store<Education>) {}

  getEducation(id: string): Observable<any> {
    this.store.dispatch({
      type: educationActions.GET_EDUCATION,
      id,
    });

    return this.store
      .select(educationSelectors.getEducation)
      .pipe(filter((data) => !!data));
  }

  createEducationItem(educationId: string, data: any) {
    this.store.dispatch({
      type: educationActions.CREATE_EDUCATION_ITEM,
      educationId,
      data,
    });
  }

  updateEducationItem(data: any) {
    this.store.dispatch({
      type: educationActions.UPDATE_EDUCATION_ITEM,
      data,
    });
  }

  removeEducationItem(data: any) {
    this.store.dispatch({
      type: educationActions.REMOVE_EDUCATION_ITEM,
      data,
    });
  }
}

import { Injectable } from "@angular/core";
import * as experienceActions from "../store/experience.actions";
import * as experienceSelectors from "../store/experience.selectors";
import { Store } from "@ngrx/store";
import { Experience } from "../store/experience.models";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ExperienceStoreService {
  constructor(private store: Store<Experience>) {}

  getExperience(id: string): Observable<any> {
    this.store.dispatch({
      type: experienceActions.GET_EXPERIENCE,
      id,
    });

    return this.store
      .select(experienceSelectors.getExperience)
      .pipe(filter((data) => !!data));
  }

  createExperienceItem(experienceId: string, data: any) {
    this.store.dispatch({
      type: experienceActions.CREATE_EXPERIENCE_ITEM,
      experienceId,
      data,
    });
  }

  updateExperienceItem(data: any) {
    this.store.dispatch({
      type: experienceActions.UPDATE_EXPERIENCE_ITEM,
      data,
    });
  }

  bulkUpdateExperienceItems(experienceId: string, data: any[]) {
    this.store.dispatch({
      type: experienceActions.BULK_UPDATE_EXPERIENCE_ITEMS,
      experienceId,
      data,
    });
  }

  removeExperienceItem(data: any) {
    this.store.dispatch({
      type: experienceActions.REMOVE_EXPERIENCE_ITEM,
      data,
    });
  }
}

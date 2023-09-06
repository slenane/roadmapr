import { Injectable } from "@angular/core";
import * as employmentActions from "../store/employment.actions";
import * as employmentSelectors from "../store/employment.selectors";
import { Store } from "@ngrx/store";
import { Employment } from "../store/employment.models";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EmploymentStoreService {
  constructor(private store: Store<Employment>) {}

  getEmployment(id: string): Observable<any> {
    this.store.dispatch({
      type: employmentActions.GET_EMPLOYMENT,
      id,
    });

    return this.store
      .select(employmentSelectors.getEmployment)
      .pipe(filter((data) => !!data));
  }

  createEmploymentItem(employmentId: string, data: any) {
    this.store.dispatch({
      type: employmentActions.CREATE_EMPLOYMENT_ITEM,
      employmentId,
      data,
    });
  }

  updateEmploymentItem(data: any) {
    this.store.dispatch({
      type: employmentActions.UPDATE_EMPLOYMENT_ITEM,
      data,
    });
  }

  bulkUpdateEmploymentItems(employmentId: string, data: any[]) {
    this.store.dispatch({
      type: employmentActions.BULK_UPDATE_EMPLOYMENT_ITEMS,
      employmentId,
      data,
    });
  }

  removeEmploymentItem(data: any) {
    this.store.dispatch({
      type: employmentActions.REMOVE_EMPLOYMENT_ITEM,
      data,
    });
  }
}

import { Injectable } from "@angular/core";
import * as dashboardActions from "../store/dashboard.actions";
import * as dashboardSelectors from "../store/dashboard.selectors";
import { Store } from "@ngrx/store";
import { Dashboard } from "../store/dashboard.models";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DashboardStoreService {
  constructor(private store: Store<Dashboard>) {}

  getDashboard(id: string): Observable<any> {
    this.store.dispatch({
      type: dashboardActions.GET_DASHBOARD,
      id,
    });

    return this.store
      .select(dashboardSelectors.getDashboard)
      .pipe(filter((data) => !!data));
  }
}

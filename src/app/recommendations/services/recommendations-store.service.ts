import { Injectable } from "@angular/core";
import * as recommendationsActions from "../store/recommendations.actions";
import * as recommendationsSelectors from "../store/recommendations.selectors";
import { Store } from "@ngrx/store";
import { Recommendation } from "../store/recommendations.models";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RecommendationsStoreService {
  constructor(private store: Store<Recommendation[]>) {}

  getRecommendations(): Observable<any> {
    this.store.dispatch({
      type: recommendationsActions.GET_RECOMMENDATIONS,
    });

    return this.store
      .select(recommendationsSelectors.getRecommendations)
      .pipe(filter((data) => !!data));
  }
}

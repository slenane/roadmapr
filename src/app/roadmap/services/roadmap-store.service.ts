import { Injectable } from "@angular/core";
import * as roadmapActions from "../store/roadmap.actions";
import * as roadmapSelectors from "../store/roadmap.selectors";
import { Store } from "@ngrx/store";
import { Roadmap } from "../store/roadmap.models";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RoadmapStoreService {
  constructor(private store: Store<Roadmap>) {}

  getRoadmap(): Observable<any> {
    this.store.dispatch({
      type: roadmapActions.GET_ROADMAP,
    });

    return this.store
      .select(roadmapSelectors.getRoadmap)
      .pipe(filter((data) => !!data));
  }
}

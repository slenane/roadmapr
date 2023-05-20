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

  getRoadmap(id: string): Observable<any> {
    this.store.dispatch({
      type: roadmapActions.GET_ROADMAP,
      id,
    });

    return this.store
      .select(roadmapSelectors.getRoadmap)
      .pipe(filter((data) => !!data));
  }

  createRoadmapItem(id: string, data: any) {
    this.store.dispatch({
      type: roadmapActions.CREATE_ROADMAP_ITEM,
      id,
      data,
    });
  }

  updateRoadmapItem(data: any) {
    this.store.dispatch({
      type: roadmapActions.UPDATE_ROADMAP_ITEM,
      data,
    });
  }

  removeRoadmapItem(id: string, data: any) {
    this.store.dispatch({
      type: roadmapActions.REMOVE_ROADMAP_ITEM,
      id,
      data,
    });
  }
}

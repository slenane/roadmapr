import { Injectable } from "@angular/core";
import * as projectActions from "../store/project.actions";
import * as projectSelectors from "../store/project.selectors";
import { Store } from "@ngrx/store";
import { Project } from "../store/project.models";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProjectStoreService {
  constructor(private store: Store<Project>) {}

  getProjects(id: string): Observable<any> {
    this.store.dispatch({
      type: projectActions.GET_PROJECTS,
      id,
    });

    return this.store
      .select(projectSelectors.getProjects)
      .pipe(filter((data) => !!data));
  }

  createProject(projectId: string, data: any) {
    this.store.dispatch({
      type: projectActions.CREATE_PROJECT,
      projectId,
      data,
    });
  }

  updateProject(data: any) {
    this.store.dispatch({
      type: projectActions.UPDATE_PROJECT,
      data,
    });
  }

  removeProject(data: any) {
    this.store.dispatch({
      type: projectActions.REMOVE_PROJECT,
      data,
    });
  }
}

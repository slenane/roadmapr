import { Injectable } from "@angular/core";
import * as projectActions from "../store/projects.actions";
import * as projectSelectors from "../store/projects.selectors";
import { Store } from "@ngrx/store";
import { Projects } from "../store/projects.models";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProjectsStoreService {
  constructor(private store: Store<Projects>) {}

  getProjects(id: string): Observable<any> {
    this.store.dispatch({
      type: projectActions.GET_PROJECTS,
      id,
    });

    return this.store
      .select(projectSelectors.getProjects)
      .pipe(filter((data) => !!data));
  }

  createProject(projectsId: string, data: any) {
    console.log(projectsId, data);
    this.store.dispatch({
      type: projectActions.CREATE_PROJECT,
      projectsId,
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

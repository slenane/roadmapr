import { Projects } from "./project.models";
import * as projectActions from "./project.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

const initialState: Projects = {
  projectList: [],
  user: "",
  _id: "",
};

const projectReducer = createReducer(
  initialState,
  on(projectActions.GetProjectsSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  }),
  on(projectActions.CreateProjectSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  }),
  on(projectActions.UpdateProjectSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  }),
  on(projectActions.RemoveProjectSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  })
);

export const reducer = (state: Projects | undefined, action: Action) => {
  return projectReducer(state, action);
};

export const getProjects = (state: Projects) => state;

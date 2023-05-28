import { props, createAction } from "@ngrx/store";
import { Project, Projects } from "./project.models";

export const GET_PROJECTS = "[Project] Get Project";
export const CREATE_PROJECT = "[Project] Create Project";
export const UPDATE_PROJECT = "[Project] Update Project";
export const REMOVE_PROJECT = "[Project] Remove Project";

const GET_PROJECTS_SUCCESS = "[Project] Project Loaded Successfully",
  GET_PROJECTS_ERROR = "[Project] Registration Error",
  CREATE_PROJECT_SUCCESS = "[Project] Project Created Successfully",
  CREATE_PROJECT_ERROR = "[Project] Project Creation Error",
  UPDATE_PROJECT_SUCCESS = "[Project] Project Updated Error",
  UPDATE_PROJECT_ERROR = "[Project] Project Update Error",
  REMOVE_PROJECT_SUCCESS = "[Project] Project Removed Error",
  REMOVE_PROJECT_ERROR = "[Project] Project Removal Error";

export const GetProject = createAction(GET_PROJECTS, props<{ id: number }>());

export const GetProjectsSuccess = createAction(
  GET_PROJECTS_SUCCESS,
  props<{ payload: Projects }>()
);

export const GetProjectsError = createAction(
  GET_PROJECTS_ERROR,
  props<{ payload: string }>()
);

export const CreateProject = createAction(
  CREATE_PROJECT,
  props<{ projectId: string; data: any }>()
);

export const CreateProjectSuccess = createAction(
  CREATE_PROJECT_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const CreateProjectError = createAction(
  CREATE_PROJECT_ERROR,
  props<{ payload: string }>()
);

export const UpdateProject = createAction(
  UPDATE_PROJECT,
  props<{ id: string; data: any }>()
);

export const UpdateProjectSuccess = createAction(
  UPDATE_PROJECT_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const UpdateProjectError = createAction(
  UPDATE_PROJECT_ERROR,
  props<{ payload: string }>()
);

export const RemoveProject = createAction(
  REMOVE_PROJECT,
  props<{ id: string; data: any }>()
);

export const RemoveProjectSuccess = createAction(
  REMOVE_PROJECT_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const RemoveProjectError = createAction(
  REMOVE_PROJECT_ERROR,
  props<{ payload: string }>()
);

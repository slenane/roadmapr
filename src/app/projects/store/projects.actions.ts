import { props, createAction } from "@ngrx/store";
import { Projects } from "./projects.models";

export const GET_PROJECTS = "[Projects] Get Projects";
export const CREATE_PROJECT = "[Projects] Create Project";
export const UPDATE_PROJECT = "[Projects] Update Project";
export const REMOVE_PROJECT = "[Projects] Remove Project";

const GET_PROJECTS_SUCCESS = "[Projects] Projects Loaded Successfully",
  GET_PROJECTS_ERROR = "[Projects] Projects Load Error",
  CREATE_PROJECT_SUCCESS = "[Projects] Project Created Successfully",
  CREATE_PROJECT_ERROR = "[Projects] Project Creation Error",
  UPDATE_PROJECT_SUCCESS = "[Projects] Project Updated Error",
  UPDATE_PROJECT_ERROR = "[Projects] Project Update Error",
  REMOVE_PROJECT_SUCCESS = "[Projects] Project Removed Error",
  REMOVE_PROJECT_ERROR = "[Projects] Project Removal Error";

export const GetProjects = createAction(GET_PROJECTS, props<{ id: number }>());

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
  props<{ projectsId: string; data: any }>()
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

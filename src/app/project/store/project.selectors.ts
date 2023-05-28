import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromProject from "./project.reducer";
import { Projects } from "./project.models";

export const getProjectState = createFeatureSelector<Projects>("project");

export const getProjects = createSelector(
  getProjectState,
  fromProject.getProjects
);

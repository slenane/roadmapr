import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromProject from "./projects.reducer";
import { Projects } from "./projects.models";

export const getProjectState = createFeatureSelector<Projects>("projects");

export const getProjects = createSelector(
  getProjectState,
  fromProject.getProjects
);

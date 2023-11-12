import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromExperience from "./experience.reducer";
import { Experience } from "./experience.models";

export const getExperienceState =
  createFeatureSelector<Experience>("experience");

export const getExperience = createSelector(
  getExperienceState,
  fromExperience.getExperience
);

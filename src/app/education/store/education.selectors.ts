import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromEducation from "./education.reducer";
import { Education } from "./education.models";

export const getEducationState = createFeatureSelector<Education>("education");

export const getEducation = createSelector(
  getEducationState,
  fromEducation.getEducation
);

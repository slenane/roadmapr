import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromEmployment from "./employment.reducer";
import { Employment } from "./employment.models";

export const getEmploymentState =
  createFeatureSelector<Employment>("employment");

export const getEmployment = createSelector(
  getEmploymentState,
  fromEmployment.getEmployment
);

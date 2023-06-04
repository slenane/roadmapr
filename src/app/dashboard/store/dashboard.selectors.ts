import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromDashboard from "./dashboard.reducer";
import { Dashboard } from "./dashboard.models";

export const getDashboardState = createFeatureSelector<Dashboard>("dashboard");

export const getDashboard = createSelector(
  getDashboardState,
  fromDashboard.getDashboard
);

import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromRecommendations from "./recommendations.reducer";
import { Recommendation } from "./recommendations.models";

export const getRecommendationsState =
  createFeatureSelector<Recommendation[]>("recommendations");

export const getRecommendations = createSelector(
  getRecommendationsState,
  fromRecommendations.getRecommendations
);

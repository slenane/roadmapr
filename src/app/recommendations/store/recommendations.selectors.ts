import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromRecommendations from "./recommendations.reducer";
import { Recommendation, RemoteJob } from "./recommendations.models";

export const getRecommendationsState = createFeatureSelector<{
  recommendations: Recommendation[];
  remoteJobs: RemoteJob[];
}>("recommendations");

export const getRecommendations = createSelector(
  getRecommendationsState,
  fromRecommendations.getRecommendations
);

export const getRemoteJobs = createSelector(
  getRecommendationsState,
  fromRecommendations.getRemoteJobs
);

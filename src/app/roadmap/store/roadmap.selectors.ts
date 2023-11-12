import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromRoadmap from "./roadmap.reducer";
import { Roadmap } from "./roadmap.models";

export const getRoadmapState = createFeatureSelector<Roadmap>("roadmap");

export const getRoadmap = createSelector(
  getRoadmapState,
  fromRoadmap.getRoadmap
);

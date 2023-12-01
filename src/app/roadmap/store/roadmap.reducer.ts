import { Roadmap } from "./roadmap.models";
import * as RoadmapActions from "./roadmap.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

export const roadmapInitialState: Roadmap = {
  education: [],
  experience: [],
  projects: [],
};

const RoadmapReducer = createReducer(
  roadmapInitialState,
  on(RoadmapActions.GetRoadmapSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  }),
  on(RoadmapActions.UpdateRoadmapSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  })
);

export const reducer = (state: Roadmap | undefined, action: Action) => {
  return RoadmapReducer(state, action);
};

export const getRoadmap = (state: Roadmap) => state;

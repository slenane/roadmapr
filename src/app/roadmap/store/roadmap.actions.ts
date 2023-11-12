import { props, createAction } from "@ngrx/store";
import { Roadmap } from "./roadmap.models";

export const GET_ROADMAP = "[Roadmap] Get Roadmap";

const GET_ROADMAP_SUCCESS = "[Roadmap] Roadmap Loaded Successfully",
  GET_ROADMAP_ERROR = "[Roadmap] Roadmap Load Error";

export const GetRoadmap = createAction(GET_ROADMAP, props<{ id: string }>());

export const GetRoadmapSuccess = createAction(
  GET_ROADMAP_SUCCESS,
  props<{ payload: Roadmap }>()
);

export const GetRoadmapError = createAction(
  GET_ROADMAP_ERROR,
  props<{ payload: string }>()
);

export const ResetState = createAction("[Roadmap] Reset State");

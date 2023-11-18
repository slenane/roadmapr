import { props, createAction } from "@ngrx/store";
import { Roadmap } from "./roadmap.models";
import {
  IDeveloperPath,
  IDeveloperStack,
} from "src/app/shared/constants/dev-paths.constants";

export const GET_ROADMAP = "[Roadmap] Get Roadmap";
export const UPDATE_ROADMAP = "[Roadmap] Update Roadmap";

const GET_ROADMAP_SUCCESS = "[Roadmap] Roadmap Loaded Successfully",
  GET_ROADMAP_ERROR = "[Roadmap] Roadmap Load Error",
  UPDATE_ROADMAP_SUCCESS = "[Roadmap] Roadmap Updated Successfully",
  UPDATE_ROADMAP_ERROR = "[Roadmap] Roadmap Update Error";

export const GetRoadmap = createAction(GET_ROADMAP, props<{ id: string }>());

export const GetRoadmapSuccess = createAction(
  GET_ROADMAP_SUCCESS,
  props<{ payload: Roadmap }>()
);

export const GetRoadmapError = createAction(
  GET_ROADMAP_ERROR,
  props<{ payload: string }>()
);

export const UpdateRoadmap = createAction(
  UPDATE_ROADMAP,
  props<{ data: { path: IDeveloperPath; stack: IDeveloperStack } }>()
);

export const UpdateRoadmapSuccess = createAction(
  UPDATE_ROADMAP_SUCCESS,
  props<{ payload: Roadmap }>()
);

export const UpdateRoadmapError = createAction(UPDATE_ROADMAP_ERROR);

export const ResetState = createAction("[Roadmap] Reset State");

import { props, createAction } from "@ngrx/store";
import { Roadmap } from "./roadmap.models";

export const GET_ROADMAP = "[Roadmap] Get Roadmap";
export const CREATE_ROADMAP_ITEM = "[Roadmap] Create Roadmap Item";
export const UPDATE_ROADMAP_ITEM = "[Roadmap] Update Roadmap Item";
export const REMOVE_ROADMAP_ITEM = "[Roadmap] Remove Roadmap Item";

const GET_ROADMAP_SUCCESS = "[Roadmap] Roadmap Loaded Successfully",
  GET_ROADMAP_ERROR = "[Auth] Registration Error",
  CREATE_ROADMAP_ITEM_SUCCESS = "[Auth] Roadmap Item Created Successfully",
  CREATE_ROADMAP_ITEM_ERROR = "[Auth] Roadmap Item Creation Error",
  UPDATE_ROADMAP_ITEM_SUCCESS = "[Auth] Roadmap Item Updated Error",
  UPDATE_ROADMAP_ITEM_ERROR = "[Auth] Roadmap Item Update Error",
  REMOVE_ROADMAP_ITEM_SUCCESS = "[Auth] Roadmap Item Removed Error",
  REMOVE_ROADMAP_ITEM_ERROR = "[Auth] Roadmap Item Removal Error";

export const GetRoadmap = createAction(GET_ROADMAP, props<{ id: number }>());

export const GetRoadmapSuccess = createAction(
  GET_ROADMAP_SUCCESS,
  props<{ payload: Roadmap }>()
);

export const GetRoadmapError = createAction(
  GET_ROADMAP_ERROR,
  props<{ payload: string }>()
);

export const CreateRoadmapItem = createAction(
  CREATE_ROADMAP_ITEM,
  props<{ roadmapId: string; data: any }>()
);

export const CreateRoadmapItemSuccess = createAction(
  CREATE_ROADMAP_ITEM_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const CreateRoadmapItemError = createAction(
  CREATE_ROADMAP_ITEM_ERROR,
  props<{ payload: string }>()
);

export const UpdateRoadmapItem = createAction(
  UPDATE_ROADMAP_ITEM,
  props<{ id: string; data: any }>()
);

export const UpdateRoadmapItemSuccess = createAction(
  UPDATE_ROADMAP_ITEM_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const UpdateRoadmapItemError = createAction(
  UPDATE_ROADMAP_ITEM_ERROR,
  props<{ payload: string }>()
);

export const RemoveRoadmapItem = createAction(
  REMOVE_ROADMAP_ITEM,
  props<{ id: string; data: any }>()
);

export const RemoveRoadmapItemSuccess = createAction(
  REMOVE_ROADMAP_ITEM_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const RemoveRoadmapItemError = createAction(
  REMOVE_ROADMAP_ITEM_ERROR,
  props<{ payload: string }>()
);

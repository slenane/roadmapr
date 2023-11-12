import { props, createAction } from "@ngrx/store";
import { Experience } from "./experience.models";

export const GET_EXPERIENCE = "[Experience] Get Experience";
export const CREATE_EXPERIENCE_ITEM = "[Experience] Create Experience";
export const UPDATE_EXPERIENCE_ITEM = "[Experience] Update Experience";
export const BULK_UPDATE_EXPERIENCE_ITEMS =
  "[Experience] Bulk Update Experience Items";
export const REMOVE_EXPERIENCE_ITEM = "[Experience] Remove Experience";

const GET_EXPERIENCE_SUCCESS = "[Experience] Experience Loaded Successfully",
  GET_EXPERIENCE_ERROR = "[Experience] Experience Load Error",
  CREATE_EXPERIENCE_ITEM_SUCCESS =
    "[Experience] Experience Created Successfully",
  CREATE_EXPERIENCE_ITEM_ERROR = "[Experience] Experience Creation Error",
  UPDATE_EXPERIENCE_ITEM_SUCCESS = "[Experience] Experience Updated Error",
  UPDATE_EXPERIENCE_ITEM_ERROR = "[Experience] Experience Update Error",
  BULK_UPDATE_EXPERIENCE_ITEMS_SUCCESS =
    "[Experience] Experience Items Updated Error",
  BULK_UPDATE_EXPERIENCE_ITEMS_ERROR =
    "[Experience] Experience Items Update Error",
  REMOVE_EXPERIENCE_ITEM_SUCCESS = "[Experience] Experience Removed Error",
  REMOVE_EXPERIENCE_ITEM_ERROR = "[Experience] Experience Removal Error";

export const GetExperience = createAction(
  GET_EXPERIENCE,
  props<{ id: number }>()
);

export const GetExperienceSuccess = createAction(
  GET_EXPERIENCE_SUCCESS,
  props<{ payload: Experience }>()
);

export const GetExperienceError = createAction(
  GET_EXPERIENCE_ERROR,
  props<{ payload: string }>()
);

export const CreateExperienceItem = createAction(
  CREATE_EXPERIENCE_ITEM,
  props<{ experienceId: string; data: any }>()
);

export const CreateExperienceItemSuccess = createAction(
  CREATE_EXPERIENCE_ITEM_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const CreateExperienceItemError = createAction(
  CREATE_EXPERIENCE_ITEM_ERROR,
  props<{ payload: string }>()
);

export const UpdateExperienceItem = createAction(
  UPDATE_EXPERIENCE_ITEM,
  props<{ id: string; data: any }>()
);

export const UpdateExperienceItemSuccess = createAction(
  UPDATE_EXPERIENCE_ITEM_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const UpdateExperienceItemError = createAction(
  UPDATE_EXPERIENCE_ITEM_ERROR,
  props<{ payload: string }>()
);

export const BulkUpdateExperienceItems = createAction(
  BULK_UPDATE_EXPERIENCE_ITEMS,
  props<{ id: string; data: any[] }>()
);

export const BulkUpdateExperienceItemsSuccess = createAction(
  BULK_UPDATE_EXPERIENCE_ITEMS_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const BulkUpdateExperienceItemsError = createAction(
  BULK_UPDATE_EXPERIENCE_ITEMS_ERROR,
  props<{ payload: string }>()
);

export const RemoveExperienceItem = createAction(
  REMOVE_EXPERIENCE_ITEM,
  props<{ id: string; data: any }>()
);

export const RemoveExperienceItemSuccess = createAction(
  REMOVE_EXPERIENCE_ITEM_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const RemoveExperienceItemError = createAction(
  REMOVE_EXPERIENCE_ITEM_ERROR,
  props<{ payload: string }>()
);

export const ResetState = createAction("[Experience] Reset State");

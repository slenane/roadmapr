import { props, createAction } from "@ngrx/store";
import { Education } from "./education.models";

export const GET_EDUCATION = "[Education] Get Education";
export const CREATE_EDUCATION_ITEM = "[Education] Create Education Item";
export const UPDATE_EDUCATION_ITEM = "[Education] Update Education Item";
export const REMOVE_EDUCATION_ITEM = "[Education] Remove Education Item";

const GET_EDUCATION_SUCCESS = "[Education] Education Loaded Successfully",
  GET_EDUCATION_ERROR = "[Education] Education Load Error",
  CREATE_EDUCATION_ITEM_SUCCESS =
    "[Education] Education Item Created Successfully",
  CREATE_EDUCATION_ITEM_ERROR = "[Education] Education Item Creation Error",
  UPDATE_EDUCATION_ITEM_SUCCESS = "[Education] Education Item Updated Error",
  UPDATE_EDUCATION_ITEM_ERROR = "[Education] Education Item Update Error",
  REMOVE_EDUCATION_ITEM_SUCCESS = "[Education] Education Item Removed Error",
  REMOVE_EDUCATION_ITEM_ERROR = "[Education] Education Item Removal Error";

export const GetEducation = createAction(
  GET_EDUCATION,
  props<{ id: number }>()
);

export const GetEducationSuccess = createAction(
  GET_EDUCATION_SUCCESS,
  props<{ payload: Education }>()
);

export const GetEducationError = createAction(
  GET_EDUCATION_ERROR,
  props<{ payload: string }>()
);

export const CreateEducationItem = createAction(
  CREATE_EDUCATION_ITEM,
  props<{ educationId: string; data: any }>()
);

export const CreateEducationItemSuccess = createAction(
  CREATE_EDUCATION_ITEM_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const CreateEducationItemError = createAction(
  CREATE_EDUCATION_ITEM_ERROR,
  props<{ payload: string }>()
);

export const UpdateEducationItem = createAction(
  UPDATE_EDUCATION_ITEM,
  props<{ id: string; data: any }>()
);

export const UpdateEducationItemSuccess = createAction(
  UPDATE_EDUCATION_ITEM_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const UpdateEducationItemError = createAction(
  UPDATE_EDUCATION_ITEM_ERROR,
  props<{ payload: string }>()
);

export const RemoveEducationItem = createAction(
  REMOVE_EDUCATION_ITEM,
  props<{ id: string; data: any }>()
);

export const RemoveEducationItemSuccess = createAction(
  REMOVE_EDUCATION_ITEM_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const RemoveEducationItemError = createAction(
  REMOVE_EDUCATION_ITEM_ERROR,
  props<{ payload: string }>()
);

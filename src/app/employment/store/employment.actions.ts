import { props, createAction } from "@ngrx/store";
import { Employment } from "./employment.models";

export const GET_EMPLOYMENT = "[Employment] Get Employment";
export const CREATE_EMPLOYMENT_ITEM = "[Employment] Create Employment";
export const UPDATE_EMPLOYMENT_ITEM = "[Employment] Update Employment";
export const REMOVE_EMPLOYMENT_ITEM = "[Employment] Remove Employment";

const GET_EMPLOYMENT_SUCCESS = "[Employment] Employment Loaded Successfully",
  GET_EMPLOYMENT_ERROR = "[Employment] Employment Load Error",
  CREATE_EMPLOYMENT_ITEM_SUCCESS =
    "[Employment] Employment Created Successfully",
  CREATE_EMPLOYMENT_ITEM_ERROR = "[Employment] Employment Creation Error",
  UPDATE_EMPLOYMENT_ITEM_SUCCESS = "[Employment] Employment Updated Error",
  UPDATE_EMPLOYMENT_ITEM_ERROR = "[Employment] Employment Update Error",
  REMOVE_EMPLOYMENT_ITEM_SUCCESS = "[Employment] Employment Removed Error",
  REMOVE_EMPLOYMENT_ITEM_ERROR = "[Employment] Employment Removal Error";

export const GetEmployment = createAction(
  GET_EMPLOYMENT,
  props<{ id: number }>()
);

export const GetEmploymentSuccess = createAction(
  GET_EMPLOYMENT_SUCCESS,
  props<{ payload: Employment }>()
);

export const GetEmploymentError = createAction(
  GET_EMPLOYMENT_ERROR,
  props<{ payload: string }>()
);

export const CreateEmploymentItem = createAction(
  CREATE_EMPLOYMENT_ITEM,
  props<{ employmentId: string; data: any }>()
);

export const CreateEmploymentItemSuccess = createAction(
  CREATE_EMPLOYMENT_ITEM_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const CreateEmploymentItemError = createAction(
  CREATE_EMPLOYMENT_ITEM_ERROR,
  props<{ payload: string }>()
);

export const UpdateEmploymentItem = createAction(
  UPDATE_EMPLOYMENT_ITEM,
  props<{ id: string; data: any }>()
);

export const UpdateEmploymentItemSuccess = createAction(
  UPDATE_EMPLOYMENT_ITEM_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const UpdateEmploymentItemError = createAction(
  UPDATE_EMPLOYMENT_ITEM_ERROR,
  props<{ payload: string }>()
);

export const RemoveEmploymentItem = createAction(
  REMOVE_EMPLOYMENT_ITEM,
  props<{ id: string; data: any }>()
);

export const RemoveEmploymentItemSuccess = createAction(
  REMOVE_EMPLOYMENT_ITEM_SUCCESS,
  props<{ payload: { data: any } }>()
);

export const RemoveEmploymentItemError = createAction(
  REMOVE_EMPLOYMENT_ITEM_ERROR,
  props<{ payload: string }>()
);

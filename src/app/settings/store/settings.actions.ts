import { props, createAction } from "@ngrx/store";
import { Settings } from "./settings.models";

export const GET_SETTINGS = "[Settings] Get Settings";
export const UPDATE_SETTINGS = "[Settings] Update Settings";
export const UPDATE_PASSWORD = "[Settings] Update Password";
export const DELETE_ACCOUNT = "[Settings] Delete Account";

const GET_SETTINGS_SUCCESS = "[Settings] Settings Loaded Successfully",
  GET_SETTINGS_ERROR = "[Settings] Settings Load Error",
  UPDATE_SETTINGS_SUCCESS = "[Settings] Settings Updated Successfully",
  UPDATE_SETTINGS_ERROR = "[Settings] Settings Update Error",
  UPDATE_PASSWORD_SUCCESS = "[Settings] Password Updated Successfully",
  UPDATE_PASSWORD_ERROR = "[Settings] Password Update Error",
  DELETE_ACCOUNT_SUCCESS = "[Settings] Account Deleted Successfully",
  DELETE_ACCOUNT_ERROR = "[Settings] Account Deletion Error";

export const GetSettings = createAction(GET_SETTINGS, props<{ id: string }>());

export const GetSettingsSuccess = createAction(
  GET_SETTINGS_SUCCESS,
  props<{ payload: Settings }>()
);

export const GetSettingsError = createAction(
  GET_SETTINGS_ERROR,
  props<{ payload: string }>()
);

export const UpdateSettings = createAction(
  UPDATE_SETTINGS,
  props<{ id: string; data: any }>()
);

export const UpdateSettingsSuccess = createAction(
  UPDATE_SETTINGS_SUCCESS,
  props<{ payload: Settings }>()
);

export const UpdateSettingsError = createAction(
  UPDATE_SETTINGS_ERROR,
  props<{ payload: string }>()
);

export const UpdatePassword = createAction(
  UPDATE_PASSWORD,
  props<{ id: string; data: any }>()
);

export const UpdatePasswordSuccess = createAction(
  UPDATE_PASSWORD_SUCCESS,
  props<{ payload: Settings }>()
);

export const UpdatePasswordError = createAction(
  UPDATE_PASSWORD_ERROR,
  props<{ payload: string }>()
);

export const DeleteAccount = createAction(DELETE_ACCOUNT);

export const DeleteAccountSuccess = createAction(DELETE_ACCOUNT_SUCCESS);

export const DeleteAccountError = createAction(
  DELETE_ACCOUNT_ERROR,
  props<{ payload: string }>()
);

export const ResetState = createAction("[Settings] Reset State");

import { props, createAction } from "@ngrx/store";
import { Settings } from "./settings.models";

export const GET_SETTINGS = "[Settings] Get Settings";
export const UPDATE_SETTINGS = "[Settings] Update Settings";

const GET_SETTINGS_SUCCESS = "[Settings] Settings Loaded Successfully",
  GET_SETTINGS_ERROR = "[Settings] Settings Load Error",
  UPDATE_SETTINGS_SUCCESS = "[Settings] Settings Updated Successfully",
  UPDATE_SETTINGS_ERROR = "[Settings] Settings Update Error";

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

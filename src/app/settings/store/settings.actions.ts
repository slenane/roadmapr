import { props, createAction } from "@ngrx/store";
import { Settings } from "./settings.models";

export const GET_SETTINGS = "[Settings] Get Settings";
export const UPDATE_SETTINGS = "[Settings] Update Settings";
export const REMOVE_GITHUB = "[Settings] Remove GitHub";
export const UPDATE_EMAIL = "[Settings] Update Email";
export const UPDATE_PASSWORD = "[Settings] Update Password";
export const UPDATE_EXISTING_PASSWORD = "[Settings] Update Existing Password";
export const DELETE_ACCOUNT = "[Settings] Delete Account";

const GET_SETTINGS_SUCCESS = "[Settings] Settings Loaded Successfully",
  GET_SETTINGS_ERROR = "[Settings] Settings Load Error",
  UPDATE_SETTINGS_SUCCESS = "[Settings] Settings Updated Successfully",
  UPDATE_SETTINGS_ERROR = "[Settings] Settings Update Error",
  REMOVE_GITHUB_SUCCESS = "[Settings] GitHub Removed Successfully",
  REMOVE_GITHUB_ERROR = "[Settings] GitHub Remove Error",
  UPDATE_EMAIL_SUCCESS = "[Settings] Email Updated Successfully",
  UPDATE_EMAIL_ERROR = "[Settings] Email Update Error",
  UPDATE_PASSWORD_SUCCESS = "[Settings] Password Updated Successfully",
  UPDATE_PASSWORD_ERROR = "[Settings] Password Update Error",
  UPDATE_EXISTING_PASSWORD_SUCCESS =
    "[Settings] Existing Password Updated Successfully",
  UPDATE_EXISTING_PASSWORD_ERROR = "[Settings] Existing Password Update Error",
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

export const RemoveGithub = createAction(
  REMOVE_GITHUB,
  props<{ id: string }>()
);

export const RemoveGithubSuccess = createAction(
  REMOVE_GITHUB_SUCCESS,
  props<{ payload: Settings }>()
);

export const RemoveGithubError = createAction(
  REMOVE_GITHUB_ERROR,
  props<{ payload: string }>()
);

export const UpdateEmail = createAction(
  UPDATE_EMAIL,
  props<{ id: string; body: any }>()
);

export const UpdateEmailSuccess = createAction(UPDATE_EMAIL_SUCCESS);

export const UpdateEmailError = createAction(UPDATE_EMAIL_ERROR);

export const UpdatePassword = createAction(
  UPDATE_PASSWORD,
  props<{ id: string; password: string }>()
);

export const UpdatePasswordSuccess = createAction(
  UPDATE_PASSWORD_SUCCESS,
  props<{ payload: Settings }>()
);

export const UpdatePasswordError = createAction(
  UPDATE_PASSWORD_ERROR,
  props<{ payload: string }>()
);

export const UpdateExistingPassword = createAction(
  UPDATE_EXISTING_PASSWORD,
  props<{ id: string; passwordConfig: { current: string; new: string } }>()
);

export const UpdateExistingPasswordSuccess = createAction(
  UPDATE_EXISTING_PASSWORD_SUCCESS,
  props<{ payload: Settings }>()
);

export const UpdateExistingPasswordError = createAction(
  UPDATE_EXISTING_PASSWORD_ERROR,
  props<{ payload: string }>()
);

export const DeleteAccount = createAction(DELETE_ACCOUNT);

export const DeleteAccountSuccess = createAction(DELETE_ACCOUNT_SUCCESS);

export const DeleteAccountError = createAction(
  DELETE_ACCOUNT_ERROR,
  props<{ payload: string }>()
);

export const ResetState = createAction("[Settings] Reset State");

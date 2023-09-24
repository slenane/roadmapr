import { props, createAction } from "@ngrx/store";
import { Profile } from "./profile.models";

export const GET_PROFILE = "[Profile] Get Profile";
export const UPDATE_PROFILE = "[Profile] Update Profile";

const GET_PROFILE_SUCCESS = "[Profile] Profile Loaded Successfully",
  GET_PROFILE_ERROR = "[Profile] Profile Load Error",
  UPDATE_PROFILE_SUCCESS = "[Profile] Profile Updated Successfully",
  UPDATE_PROFILE_ERROR = "[Profile] Profile Update Error";

export const GetProfile = createAction(GET_PROFILE, props<{ id: string }>());

export const GetProfileSuccess = createAction(
  GET_PROFILE_SUCCESS,
  props<{ payload: Profile }>()
);

export const GetProfileError = createAction(
  GET_PROFILE_ERROR,
  props<{ payload: string }>()
);

export const UpdateProfile = createAction(
  UPDATE_PROFILE,
  props<{ id: string; data: any }>()
);

export const UpdateProfileSuccess = createAction(
  UPDATE_PROFILE_SUCCESS,
  props<{ payload: Profile }>()
);

export const UpdateProfileError = createAction(
  UPDATE_PROFILE_ERROR,
  props<{ payload: string }>()
);

export const ResetState = createAction("[Profile] Reset State");

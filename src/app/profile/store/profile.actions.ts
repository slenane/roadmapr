import { props, createAction } from "@ngrx/store";
import { Profile } from "./profile.models";

export const GET_PROFILE = "[Profile] Get Profile";
const GET_PROFILE_SUCCESS = "[Profile] Profile Loaded Successfully",
  GET_PROFILE_ERROR = "[Auth] Registration Error";

export const GetProfile = createAction(GET_PROFILE, props<{ id: number }>());

export const GetProfileSuccess = createAction(
  GET_PROFILE_SUCCESS,
  props<{ payload: Profile }>()
);

export const GetProfileError = createAction(
  GET_PROFILE_ERROR,
  props<{ payload: string }>()
);

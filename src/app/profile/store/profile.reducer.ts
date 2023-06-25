import { Profile } from "./profile.models";
import * as profileActions from "./profile.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

const initialState: Profile = {
  _id: "",
  name: "",
  username: "",
  location: "",
  nationality: "",
  profileImage: "",
  coverImage: "",
  role: "",
  bio: "",
  github: "",
  linkedIn: "",
  twitter: "",
  cv: "",
  skills: [],
  languagesSpoken: [],
  education: "",
  projects: "",
  employment: "",
  theme: "",
  notifications: false,
  email: "",
};

const profileReducer = createReducer(
  initialState,
  on(profileActions.GetProfileSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  })
);

export const reducer = (state: Profile | undefined, action: Action) => {
  return profileReducer(state, action);
};

export const getProfile = (state: Profile) => state;

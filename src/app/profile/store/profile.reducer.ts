import { Profile } from "./profile.models";
import * as profileActions from "./profile.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

export const profileInitialState: Profile = {
  _id: "",
  firstName: "",
  lastName: "",
  username: "",
  location: "",
  nationality: "",
  profileImage: "",
  coverImage: "",
  path: "",
  bio: "",
  links: {
    linkedIn: "",
    twitter: "",
    cv: "",
    portfolio: "",
  },
  languagesSpoken: [],
  previousEducation: [],
  interests: {
    professional_interests: [],
    personal_interests: [],
  },
  stack: [],
  education: "",
  projects: "",
  employment: "",
  theme: "light",
  preferredLanguage: "en",
  notifications: false,
  email: "",
};

const profileReducer = createReducer(
  profileInitialState,
  on(profileActions.GetProfileSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  }),
  on(profileActions.UpdateProfileSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  }),
  on(profileActions.UpdateProfileImageSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  })
);

export const reducer = (state: Profile | undefined, action: Action) => {
  return profileReducer(state, action);
};

export const getProfile = (state: Profile) => state;

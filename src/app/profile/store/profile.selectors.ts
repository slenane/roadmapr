import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromProfile from "./profile.reducer";
import { Profile } from "./profile.models";

export const getProfileState = createFeatureSelector<Profile>("profile");

export const getProfile = createSelector(
  getProfileState,
  fromProfile.getProfile
);

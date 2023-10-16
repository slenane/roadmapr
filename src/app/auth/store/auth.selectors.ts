import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";

export const getAuthState = createFeatureSelector<fromAuth.Auth>("auth");

export const getUserId = createSelector(getAuthState, fromAuth.getUserId);

export const registrationSuccess = createSelector(
  getAuthState,
  fromAuth.registrationSuccess
);

export const registrationError = createSelector(
  getAuthState,
  fromAuth.registrationError
);

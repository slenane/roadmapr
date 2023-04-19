import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";

export const getAuthState = createFeatureSelector<fromAuth.State>("auth");

// export const getUserToken = createSelector(getAuthState, fromAuth.getUserToken);

// export const getRefreshToken = createSelector(getAuthState, fromAuth.getRefreshToken);

// export const getAuthStep = createSelector(getAuthState, fromAuth.getAuthStep);

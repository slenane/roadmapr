import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromSettings from "./settings.reducer";
import { Settings } from "./settings.models";

export const getSettingsState = createFeatureSelector<Settings>("settings");

export const getSettings = createSelector(
  getSettingsState,
  fromSettings.getSettings
);

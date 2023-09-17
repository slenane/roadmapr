import { Settings } from "./settings.models";
import * as SettingsActions from "./settings.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

const initialState: Settings = {
  _id: "",
  theme: "light",
  preferredLanguage: "en",
  notifications: false,
  email: "",
  username: "",
};

const SettingsReducer = createReducer(
  initialState,
  on(SettingsActions.GetSettingsSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  })
);

export const reducer = (state: Settings | undefined, action: Action) => {
  return SettingsReducer(state, action);
};

export const getSettings = (state: Settings) => state;

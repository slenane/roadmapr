import { Settings } from "./settings.models";
import * as SettingsActions from "./settings.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

export const settingsInitialState: Settings = {
  userId: "",
  theme: "dark",
  preferredLanguage: "en",
  notifications: false,
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  github: {
    id: "",
    username: "",
  },
  hasPassword: false,
  emailUpdatePending: "",
};

const SettingsReducer = createReducer(
  settingsInitialState,
  on(SettingsActions.GetSettingsSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  }),
  on(SettingsActions.UpdateSettingsSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  }),
  on(SettingsActions.UpdatePasswordSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  })
);

export const reducer = (state: Settings | undefined, action: Action) => {
  return SettingsReducer(state, action);
};

export const getSettings = (state: Settings) => state;

import { Settings } from "./settings.models";
import * as SettingsActions from "./settings.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

const initialState: Settings = {
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
};

const SettingsReducer = createReducer(
  initialState,
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

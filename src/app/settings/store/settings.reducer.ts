import { Settings } from "./settings.models";
import * as SettingsActions from "./settings.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

const initialState: Settings = {
  userId: "",
  theme: "light",
  preferredLanguage: "en",
  notifications: false,
  email: "",
  username: "",
  name: "",
  github: {
    id: "",
    username: "",
  },
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

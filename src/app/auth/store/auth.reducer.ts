import { Action } from "./auth.models";
import * as authActions from "./auth.actions";
import { createReducer, on } from "@ngrx/store";

export interface Auth {
  user?: String | null;
  token?: string | null;
  isLoggedIn: boolean;
}

const initialState: Auth = {
  isLoggedIn: false,
};

const authReducer = createReducer(
  initialState,
  on(authActions.LoginSuccess, (state, payload: any) => {
    return {
      ...state,
      isLoggedIn: true,
      ...(payload.user ? { user: payload.user._id } : {}),
      ...(payload.token ? { token: payload.token } : {}),
    };
  })
);

export const reducer = (state: Auth | undefined, action: Action) => {
  return authReducer(state, action);
};

export const getUserId = (state: Auth) => state.user;

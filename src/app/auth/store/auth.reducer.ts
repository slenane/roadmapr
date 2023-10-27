import { Action } from "./auth.models";
import * as authActions from "./auth.actions";
import { createReducer, on } from "@ngrx/store";

export interface Auth {
  user?: String | null;
  token?: string | null;
  registrationSuccess?: boolean | null;
  registrationError?: boolean | null;
  sendResetPasswordEmailSuccess?: boolean | null;
  sendResetPasswordEmailError?: boolean | null;
  loginError?: boolean | null;
  isLoggedIn: boolean;
}

const initialState: Auth = {
  isLoggedIn: false,
};

const authReducer = createReducer(
  initialState,
  on(authActions.RegisterSuccess, (state) => {
    return {
      ...state,
      registrationSuccess: true,
      registrationError: null,
    };
  }),
  on(authActions.RegisterError, (state) => {
    return {
      ...state,
      registrationSuccess: null,
      registrationError: true,
    };
  }),
  on(authActions.clearRegistrationError, (state) => {
    return {
      ...state,
      registrationSuccess: null,
      registrationError: null,
    };
  }),
  on(authActions.LoginSuccess, (state, payload: any) => {
    return {
      ...state,
      isLoggedIn: true,
      ...(payload.user ? { user: payload.user._id } : {}),
      ...(payload.token ? { token: payload.token } : {}),
    };
  }),
  on(authActions.LoginError, (state) => {
    return {
      ...state,
      loginError: true,
    };
  }),
  on(authActions.clearLoginError, (state) => {
    return {
      ...state,
      loginError: null,
    };
  }),
  on(authActions.GithubLoginSuccess, (state, payload: any) => {
    return {
      ...state,
      isLoggedIn: true,
      ...(payload.user ? { user: payload.user._id } : {}),
      ...(payload.token ? { token: payload.token } : {}),
    };
  }),
  on(authActions.GithubUpdateExistingUserSuccess, (state, payload: any) => {
    return {
      ...state,
      ...(payload.user ? { user: payload.user._id } : {}),
    };
  }),
  on(authActions.SendResetPasswordEmailSuccess, (state) => {
    return {
      ...state,
      sendResetPasswordEmailSuccess: true,
      sendResetPasswordEmailError: null,
    };
  }),
  on(authActions.SendResetPasswordEmailError, (state) => {
    return {
      ...state,
      sendResetPasswordEmailSuccess: null,
      sendResetPasswordEmailError: true,
    };
  }),
  on(authActions.clearSendResetPasswordEmailError, (state) => {
    return {
      ...state,
      sendResetPasswordEmailSuccess: null,
      sendResetPasswordEmailError: null,
    };
  })
);

export const reducer = (state: Auth | undefined, action: Action) => {
  return authReducer(state, action);
};

export const getUserId = (state: Auth) => state.user;
export const registrationSuccess = (state: Auth) => state.registrationSuccess;
export const registrationError = (state: Auth) => state.registrationError;
export const sendResetPasswordEmailSuccess = (state: Auth) =>
  state.sendResetPasswordEmailSuccess;
export const sendResetPasswordEmailError = (state: Auth) =>
  state.sendResetPasswordEmailError;
export const loginError = (state: Auth) => state.loginError;

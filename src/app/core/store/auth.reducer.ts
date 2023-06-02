import { User, Action } from "./auth.models";
import * as authActions from "./auth.actions";
import { createReducer, on } from "@ngrx/store";

export interface State {
  user?: String | null;
  token?: string | null;
  isLoggedIn: boolean;
}

const initialState: State = {
  isLoggedIn: false,
};

const authReducer = createReducer(
  initialState,
  on(authActions.RegisterSuccess, (state, payload: any) => {
    return {
      ...state,
      isLoggedIn: true,
      ...(payload.user ? { user: payload.user._id } : {}),
      ...(payload.token ? { token: payload.token } : {}),
    };
  }),
  on(authActions.LoginSuccess, (state, payload: any) => {
    return {
      ...state,
      isLoggedIn: true,
      ...(payload.user ? { user: payload.user._id } : {}),
      ...(payload.token ? { token: payload.token } : {}),
    };
  })
);

export const reducer = (state: State | undefined, action: Action) => {
  return authReducer(state, action);
};

// export const getUserToken = () => reducer.state

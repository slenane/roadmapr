import { User, Action } from "./auth.models";
import * as authActions from "./auth.actions";
import { createReducer, on } from "@ngrx/store";

export interface State {
  user?: User | null;
  token?: string | null;
  isLoggedIn: boolean;
}

const initialState: State = {
  isLoggedIn: false,
};

const authReducer = createReducer(
  initialState,
  on(authActions.RegisterSuccess, (state, { payload }) => {
    console.log(state, payload);
    return { ...state, isLoggedIn: true, token: payload.token };
  }),
  on(authActions.LoginSuccess, (state, payload: any) => {
    console.log(state, payload);
    return { ...state, isLoggedIn: true, token: payload.token };
  })
);

export const reducer = (state: State | undefined, action: Action) => {
  return authReducer(state, action);
};

// export const getUserToken = () => reducer.state

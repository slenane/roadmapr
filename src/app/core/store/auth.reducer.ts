import { User, Action } from "./auth.models";
import * as authActions from "./auth.actions";
import { createReducer, on } from "@ngrx/store";

export interface State {
  user?: User | null;
  token?: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  hasError: boolean;
}

const initialState: State = {
  isLoggedIn: false,
  isLoading: false,
  errorMessage: null,
  hasError: false,
};

const authReducer = createReducer(
  initialState,
  on(authActions.RegisterSuccess, (state, { payload }) => {
    return { ...state, token: payload.token };
  })
);

export const reducer = (state: State | undefined, action: Action) => {
  return authReducer(state, action);
};

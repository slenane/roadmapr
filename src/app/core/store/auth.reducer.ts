import { Auth } from "./auth.models";
import { AuthActionTypes, AuthActions } from "./auth.actions";

const initialState: Auth = {
  isLoggedIn: false,
  isLoading: false,
  errorMessage: null,
  hasError: false,
};

export function AuthReducer(
  state: Auth = initialState,
  action: AuthActions
): Auth {
  switch (action.type) {
    case AuthActionTypes.REGISTER:
      return {
        ...state,
        hasError: false,
        errorMessage: null,
        isLoading: true,
      };

    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.accessToken,
        isLoading: false,
      };

    case AuthActionTypes.REGISTER_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        hasError: true,
        isLoading: false,
      };

    case AuthActionTypes.LOGIN:
      return {
        ...state,
        hasError: false,
        errorMessage: null,
        isLoading: true,
      };

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.accessToken,
        isLoading: false,
      };

    case AuthActionTypes.LOGIN_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        hasError: true,
        isLoading: false,
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        token: null,
        isLoading: false,
      };

    default:
      return state;
  }
}

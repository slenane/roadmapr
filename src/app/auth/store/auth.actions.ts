import { props, createAction } from "@ngrx/store";
import { TokenResponse, User } from "./auth.models";

export const REGISTER = "[Auth] Register";
export const LOGIN = "[Auth] Login";
export const GITHUB_LOGIN = "[Auth] GitHub login";
export const GITHUB_UPDATE_EXISTING_USER = "[Auth] GitHub update existing user";
export const LOGOUT = "[Auth] Log out";
const REGISTER_SUCCESS = "[Auth] Registered Successfully",
  REGISTER_ERROR = "[Auth] Registration Error",
  LOGIN_SUCCESS = "[Auth] Logged In Successfully",
  LOGIN_ERROR = "[Auth] Log In Error",
  GITHUB_LOGIN_SUCCESS = "[Auth] GitHub Logged In Successfully",
  GITHUB_LOGIN_ERROR = "[Auth] GitHub Log In Error",
  GITHUB_UPDATE_EXISTING_USER_SUCCESS =
    "[Auth] GitHub update existing user success",
  GITHUB_UPDATE_EXISTING_USER_ERROR =
    "[Auth] GitHub update existing user error",
  LOGOUT_SUCCESS = "[Auth] Logged Out Successfully",
  LOGOUT_ERROR = "[Auth] Log Out Error";

export const Register = createAction(REGISTER, props<{ userDetails: User }>());

export const RegisterSuccess = createAction(REGISTER_SUCCESS);

export const RegisterError = createAction(REGISTER_ERROR);

export const clearRegistrationError = createAction(
  "[auth] clear registration error"
);

export const Login = createAction(LOGIN, props<{ userDetails: User }>());

export const LoginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ payload: TokenResponse }>()
);

export const LoginError = createAction(LOGIN_ERROR);

export const GithubLogin = createAction(GITHUB_LOGIN);

export const GithubLoginSuccess = createAction(
  GITHUB_LOGIN_SUCCESS,
  props<{ payload: TokenResponse }>()
);

export const GithubLoginError = createAction(GITHUB_LOGIN_ERROR);

export const GithubUpdateExistingUser = createAction(
  GITHUB_UPDATE_EXISTING_USER
);

export const GithubUpdateExistingUserSuccess = createAction(
  GITHUB_UPDATE_EXISTING_USER_SUCCESS
);

export const GithubUpdateExistingUserError = createAction(
  GITHUB_UPDATE_EXISTING_USER_ERROR
);

export const Logout = createAction(LOGOUT);

export const LogoutSuccess = createAction(LOGOUT_SUCCESS);

export const LogoutError = createAction(
  LOGOUT_ERROR,
  props<{ payload: string }>()
);

export const ResetState = createAction("[Auth] Reset State");

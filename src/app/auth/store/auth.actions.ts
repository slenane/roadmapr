import { props, createAction } from "@ngrx/store";
import { TokenResponse, User } from "./auth.models";

export const REGISTER = "[Auth] Register";
export const LOGIN = "[Auth] Login";
export const GITHUB_LOGIN = "[Auth] GitHub login";
export const LOGOUT = "[Auth] Log out";
const REGISTER_SUCCESS = "[Auth] Registered Successfully",
  REGISTER_ERROR = "[Auth] Registration Error",
  LOGIN_SUCCESS = "[Auth] Logged In Successfully",
  LOGIN_ERROR = "[Auth] Log In Error",
  LOGOUT_SUCCESS = "[Auth] Logged Out Successfully",
  LOGOUT_ERROR = "[Auth] Log Out Error";

export const Register = createAction(REGISTER, props<{ userDetails: User }>());

export const RegisterSuccess = createAction(REGISTER_SUCCESS);

export const RegisterError = createAction(REGISTER_ERROR);

export const Login = createAction(LOGIN, props<{ userDetails: User }>());

export const LoginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ payload: TokenResponse }>()
);

export const LoginError = createAction(
  LOGIN_ERROR,
  props<{ payload: string }>()
);

export const GithubLogin = createAction(GITHUB_LOGIN);

export const Logout = createAction(LOGOUT);

export const LogoutSuccess = createAction(LOGOUT_SUCCESS);

export const LogoutError = createAction(
  LOGOUT_ERROR,
  props<{ payload: string }>()
);

export const ResetState = createAction("[Auth] Reset State");

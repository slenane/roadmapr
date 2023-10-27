import { props, createAction } from "@ngrx/store";
import { TokenResponse, User } from "./auth.models";

export const REGISTER = "[Auth] Register";
export const LOGIN = "[Auth] Login";
export const SEND_RESET_PASSWORD_EMAIL = "[Auth] Send Reset Password Email";
export const RESET_PASSWORD = "[Auth] Reset Password";
export const GITHUB_LOGIN = "[Auth] GitHub login";
export const GITHUB_UPDATE_EXISTING_USER = "[Auth] GitHub update existing user";
export const LOGOUT = "[Auth] Log out";
const REGISTER_SUCCESS = "[Auth] Registered Successfully",
  REGISTER_ERROR = "[Auth] Registration Error",
  REGISTER_CLEAR_ERROR = "[Auth] Clear Registration Error",
  LOGIN_SUCCESS = "[Auth] Logged In Successfully",
  LOGIN_ERROR = "[Auth] Log In Error",
  SEND_RESET_PASSWORD_EMAIL_SUCCESS =
    "[Auth] Send Reset Password Email Successfully",
  SEND_RESET_PASSWORD_EMAIL_ERROR = "[Auth] Send Reset Password Email Error",
  SEND_RESET_PASSWORD_EMAIL_CLEAR_ERROR =
    "[Auth] Send Reset Password Email Clear Error",
  RESET_PASSWORD_SUCCESS = "[Auth] Reset Password Successfully",
  RESET_PASSWORD_ERROR = "[Auth] Reset Password Error",
  LOGIN_CLEAR_ERROR = "[Auth] Clear Login Error",
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

export const clearRegistrationError = createAction(REGISTER_CLEAR_ERROR);

export const Login = createAction(LOGIN, props<{ userDetails: User }>());

export const LoginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ payload: TokenResponse }>()
);

export const LoginError = createAction(LOGIN_ERROR);

export const SendResetPasswordEmail = createAction(
  SEND_RESET_PASSWORD_EMAIL,
  props<{ email: string }>()
);

export const SendResetPasswordEmailSuccess = createAction(
  SEND_RESET_PASSWORD_EMAIL_SUCCESS
);

export const SendResetPasswordEmailError = createAction(
  SEND_RESET_PASSWORD_EMAIL_ERROR
);

export const clearSendResetPasswordEmailError = createAction(
  SEND_RESET_PASSWORD_EMAIL_CLEAR_ERROR
);

export const ResetPassword = createAction(
  RESET_PASSWORD,
  props<{ token: string; password: string }>()
);

export const ResetPasswordSuccess = createAction(RESET_PASSWORD_SUCCESS);

export const ResetPasswordError = createAction(RESET_PASSWORD_ERROR);

export const clearLoginError = createAction(LOGIN_CLEAR_ERROR);

export const GithubLogin = createAction(GITHUB_LOGIN);

export const GithubLoginSuccess = createAction(
  GITHUB_LOGIN_SUCCESS,
  props<{ payload: TokenResponse }>()
);

export const GithubLoginError = createAction(GITHUB_LOGIN_ERROR);

export const GithubUpdateExistingUser = createAction(
  GITHUB_UPDATE_EXISTING_USER,
  props<{ userId: string }>()
);

export const GithubUpdateExistingUserSuccess = createAction(
  GITHUB_UPDATE_EXISTING_USER_SUCCESS,
  props<{ payload: TokenResponse }>()
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

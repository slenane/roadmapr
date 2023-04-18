import { Action } from "@ngrx/store";
import { User } from "./auth.models";

export enum AuthActionTypes {
  REGISTER = "[Auth] Register",
  REGISTER_SUCCESS = "[Auth] Registered Successfully",
  REGISTER_ERROR = "[Auth] Registration Error",

  LOGIN = "[Auth] Login",
  LOGIN_SUCCESS = "[Auth] Logged In Successfully",
  LOGIN_ERROR = "[Auth] Log In Error",

  LOGOUT = "[Auth] Log out",
  LOGOUT_SUCCESS = "[Auth] Logged Out Successfully",
  LOGOUT_ERROR = "[Auth] Log Out Error",
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;
  constructor(public formData: User) {}
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;
  constructor(public payload: any) {}
}

export class RegisterError implements Action {
  readonly type = AuthActionTypes.REGISTER_ERROR;
  constructor(public payload: string) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public formData: User) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LOGIN_ERROR;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;
}

export class LogoutError implements Action {
  readonly type = AuthActionTypes.LOGOUT_ERROR;
  constructor(public payload: string) {}
}

export type AuthActions =
  | Register
  | RegisterSuccess
  | RegisterError
  | Login
  | LoginSuccess
  | LoginError
  | Logout
  | LogoutSuccess
  | LogoutError;

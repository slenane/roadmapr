import { Roadmap } from "../../roadmap/store/roadmap.models";

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
  roadmap: Roadmap;
  skills: object;
  languagesSpoken: object;
}

export interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
  username?: string;
}

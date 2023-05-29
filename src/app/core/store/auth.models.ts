import { Projects } from "src/app/projects/store/projects.models";
import { Roadmap } from "../../roadmap/store/roadmap.models";

export interface Action {
  type: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
  profileImage: string;
  coverImage: string;
  role: string;
  bio: string;
  github: string;
  linkedIn: string;
  twitter: string;
  cv: string;
  // employment: Employment;
  roadmap: Roadmap;
  Projects: Projects;
  // settings: Settings;
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

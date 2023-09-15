import { Projects } from "src/app/projects/store/projects.models";
import { Education } from "../../education/store/education.models";
import { Employment } from "src/app/employment/store/employment.models";

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
  employment: Employment;
  education: Education;
  Projects: Projects;
  skills: object;
  languagesSpoken: object;
}

export interface TokenResponse {
  token: string;
  user: User;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
  username?: string;
}

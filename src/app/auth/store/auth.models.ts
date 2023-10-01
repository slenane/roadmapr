import { Projects } from "src/app/projects/store/projects.models";
import { Education } from "../../education/store/education.models";
import { Employment } from "src/app/employment/store/employment.models";

export interface Action {
  type: string;
}

export interface User {
  _id: string;
  githubId?: string;
  email: string;
  firstName: string;
  lastName: string;
  exp: number;
  iat: number;
  profileImage: string;
  coverImage: string;
  path: string;
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
  preferredLanguage: string;
  theme: string;
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

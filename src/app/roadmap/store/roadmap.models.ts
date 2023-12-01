import { ExperienceItem } from "src/app/experience/store/experience.models";
import { ProjectItem } from "src/app/projects/store/projects.models";
import { EducationItem } from "src/app/education/store/education.models";
import {
  IDeveloperPath,
  IDeveloperStack,
} from "src/app/shared/constants/dev-paths.constants";

export interface Github {
  lastUpdated: Date;
  url: string;
  login: string;
  publicRepos: number;
  privateRepos: number;
  followers: number;
  reposUrl: string;
  stack: string[];
}

export interface Roadmap {
  path?: IDeveloperPath;
  stack?: IDeveloperStack;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  github?: Github;
}

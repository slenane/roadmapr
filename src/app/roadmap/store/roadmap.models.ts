import { ExperienceItem } from "src/app/experience/store/experience.models";
import { ProjectItem } from "src/app/projects/store/projects.models";
import { EducationItem } from "src/app/education/store/education.models";
import {
  IDeveloperPath,
  IDeveloperStack,
} from "src/app/shared/constants/dev-paths.constants";

export interface Github {
  lastUpdated: Date;
  name: string;
  avatar: string;
  bio: string;
  url: string;
  link: string;
  login: string;
  publicRepos: number;
  privateRepos: number;
  followers: number;
  following: number;
  reposUrl: string;
  featuredRepo?: {
    createdAt: Date;
    updatedAt: Date;
    link: string;
    name: string;
    description: string;
    languages: {
      [key: string]: number;
    };
  };
}

export interface Roadmap {
  path?: IDeveloperPath;
  stack?: IDeveloperStack;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  github?: Github;
}

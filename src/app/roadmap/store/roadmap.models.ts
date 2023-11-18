import { ExperienceItem } from "src/app/experience/store/experience.models";
import { ProjectItem } from "src/app/projects/store/projects.models";
import { EducationItem } from "src/app/education/store/education.models";
import {
  IDeveloperPath,
  IDeveloperStack,
} from "src/app/shared/constants/dev-paths.constants";

interface Github {
  name: string;
  id: number;
  url: string;
  language: string;
  forks: number;
  created_at: Date;
  updated_at: Date;
}

export interface Roadmap {
  path: IDeveloperPath | null;
  stack: IDeveloperStack | null;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  github: Github[];
}

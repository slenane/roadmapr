import { EmploymentItem } from "src/app/employment/store/employment.models";
import { ProjectItem } from "src/app/projects/store/projects.models";
import { EducationItem } from "src/app/education/store/education.models";

interface Github {
  name: string;
  id: number;
  url: string;
  language: string;
  forks: number;
  created_at: Date;
  updated_at: Date;
}

export interface Dashboard {
  education: EducationItem[];
  employment: EmploymentItem[];
  projects: ProjectItem[];
  github: Github[];
}

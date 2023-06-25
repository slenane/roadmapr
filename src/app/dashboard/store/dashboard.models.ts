import { EmploymentItem } from "src/app/employment/store/employment.models";
import { ProjectItem } from "src/app/projects/store/projects.models";
import {
  Book,
  Course,
  Degree,
  Tutorial,
} from "src/app/education/store/education.models";

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
  education: {
    books: Book[];
    courses: Course[];
    degrees: Degree[];
    tutorials: Tutorial[];
  };
  employment: EmploymentItem[];
  projects: ProjectItem[];
  github: Github[];
}

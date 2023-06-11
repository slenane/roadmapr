import { Employment } from "src/app/employment/store/employment.models";
import { Projects } from "src/app/projects/store/projects.models";
import { Roadmap } from "src/app/roadmap/store/roadmap.models";

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
  roadmap: Roadmap;
  employment: Employment;
  projects: Projects;
  github: Github[];
}

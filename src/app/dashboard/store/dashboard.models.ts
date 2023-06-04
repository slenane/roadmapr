import { Profile } from "src/app/profile/store/profile.models";
import { Projects } from "src/app/projects/store/projects.models";
import { Roadmap } from "src/app/roadmap/store/roadmap.models";

export interface Dashboard {
  _id: string;
  roadmap?: Roadmap;
  profile?: Profile;
  projects?: Projects;
}

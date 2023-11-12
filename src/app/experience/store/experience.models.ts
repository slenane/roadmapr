import { StackItem } from "src/app/shared/store/stack.models";

export interface Experience {
  experienceList: ExperienceItem[];
  user: string;
  _id: string;
}

export interface ExperienceItem {
  company: String;
  description: String;
  endDate: Date;
  role: String;
  stack: StackItem[];
  startDate: Date;
  experience: String;
  pinned: boolean;
  status: "todo" | "inProgress" | "done";
  position: Number;
  type: "professional" | "freelance";
  _id: string;
}

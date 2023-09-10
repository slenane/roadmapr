import { StackItem } from "src/app/shared/store/stack.models";

export interface Education {
  educationList: EducationItem[];
  user: string;
  _id: string;
}

export interface EducationItem {
  author: String;
  description: String;
  endDate: Date;
  github?: String;
  link: String;
  pinned: boolean;
  stack: StackItem[];
  startDate: Date;
  title: String;
  type: String;
  status: "todo" | "inProgress" | "done";
  position: Number;
  education: string;
  _id: string;
}

import { StackItem } from "src/app/shared/store/stack.models";

export interface Employment {
  employmentList: EmploymentItem[];
  user: string;
  _id: string;
}

export interface EmploymentItem {
  company: String;
  description: String;
  endDate: Date;
  role: String;
  stack: StackItem[];
  startDate: Date;
  employment: String;
  pinned: boolean;
  status: "todo" | "inProgress" | "done";
  position: Number;
  type: "employment" | "freelance";
  _id: string;
}

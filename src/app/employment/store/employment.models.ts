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
  topics: String[];
  employment: String;
  _id: string;
}

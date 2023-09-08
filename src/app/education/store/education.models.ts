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
  stack: any[];
  startDate: Date;
  title: String;
  type: String;
  status: "todo" | "inProgress" | "done";
  position: Number;
  education: string;
  _id: string;
}

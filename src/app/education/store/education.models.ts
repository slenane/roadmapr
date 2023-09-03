export interface Education {
  items: EducationItem[];
  user: string;
  _id: string;
}

export interface EducationItem {
  author: String;
  description: String;
  endDate: Date;
  github?: String;
  link: String;
  pinned_position?: number;
  stack: any[];
  startDate: Date;
  title: String;
  type: String;
  status: "todo" | "inProgress" | "done";
  position: Number;
  education: string;
  _id: string;
}

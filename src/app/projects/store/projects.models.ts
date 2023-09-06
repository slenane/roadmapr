export interface Projects {
  projectList: ProjectItem[];
  user: string;
  _id: string;
}

export interface ProjectItem {
  description: String;
  endDate?: Date;
  github: String;
  link?: String;
  notes: String;
  stack: any[];
  startDate?: Date;
  title: String;
  tagLine: String;
  type: String;
  pinned: boolean;
  status: "todo" | "inProgress" | "done";
  position: Number;
  _id: string;
}

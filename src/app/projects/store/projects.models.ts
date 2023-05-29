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
  todo: String;
  topics: String[];
  _id: string;
}

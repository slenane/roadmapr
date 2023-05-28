export interface Projects {
  projectList: Project[];
  user: string;
  _id: string;
}

export interface Project {
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

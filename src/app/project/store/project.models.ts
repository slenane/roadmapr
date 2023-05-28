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
  stack: any[];
  startDate?: Date;
  title: String;
  topics: String[];
  _id: string;
}

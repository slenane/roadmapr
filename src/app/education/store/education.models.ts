export interface Education {
  books: Book[];
  courses: Course[];
  degrees: Degree[];
  tutorials: Tutorial[];
  user: string;
  _id: string;
}

export interface Book {
  author: String;
  description: String;
  endDate: Date;
  link: String;
  stack: any[];
  startDate: Date;
  title: String;
  pin: {
    pinned: boolean;
    position: number;
  };
  education: string;
  _id: string;
}

export interface Course {
  description: String;
  endDate?: Date;
  link: String;
  instructor: String;
  stack: any[];
  startDate: Date;
  title: String;
  pin: {
    pinned: boolean;
    position: number;
  };
  education: string;
  _id: string;
}

export interface Degree {
  description: String;
  endDate: Date;
  link: String;
  institution: String;
  stack: any[];
  startDate: Date;
  title: String;
  pin: {
    pinned: boolean;
    position: number;
  };
  education: string;
  _id: string;
}

export interface Tutorial {
  description: String;
  endDate: Date;
  link: String;
  instructor: String;
  github: String;
  stack: any[];
  startDate: Date;
  title: String;
  pin: {
    pinned: boolean;
    position: number;
  };
  education: string;
  _id: string;
}

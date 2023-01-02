export interface Roadmap {
  books: Book[],
  courses: Course[],
  degrees: Degree[],
  tutorials: Tutorial[],
}

export interface Book {
  author: string,
  description: string,
  endDate: Date,
  link: string,
  publisher: string,
  stack: string[],
  startDate: Date,
  title: string,
  topics: string[],
}

export interface Course {
  description: string,
  endDate?: Date,
  link: string,
  instructor: string,
  provider: string,
  stack: string[],
  startDate: Date,
  title: string,
  topics: string[],
}

export interface Degree {
  description: string,
  endDate: Date,
  gpa: string,
  link: string,
  institution: string,
  modules: string[],
  stack: string[],
  startDate: Date,
  title: string,
  topics: string[],
}

export interface Tutorial {
  description: string,
  link: string,
  instructor: string,
  github: string,
  provider: string,
  stack: string[],
  title: string,
  topics: string[],
}
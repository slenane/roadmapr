export interface Roadmap {
  books: Book[],
  courses: Course[],
  degrees: Degree[],
  tutorials: Tutorial[],
}

export interface Book {
  author: String,
  description: String,
  endDate: Date,
  link: String,
  publisher: String,
  stack: String[],
  startDate: Date,
  title: String,
  topics: String[],
}

export interface Course {
  description: String,
  endDate?: Date,
  link: String,
  instructor: String,
  provider: String,
  stack: String[],
  startDate: Date,
  title: String,
  topics: String[],
}

export interface Degree {
  description: String,
  endDate: Date,
  gpa: String,
  link: String,
  institution: String,
  modules: String[],
  stack: String[],
  startDate: Date,
  title: String,
  topics: String[],
}

export interface Tutorial {
  description: String,
  link: String,
  instructor: String,
  github: String,
  provider: String,
  stack: String[],
  title: String,
  topics: String[],
}
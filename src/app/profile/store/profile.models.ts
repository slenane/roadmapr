import { StackItem } from "src/app/shared/store/stack.models";

export interface Profile {
  _id: string;
  username: string;
  name: string;
  email: string;

  location: string;
  nationality: string;
  profileImage: string;
  coverImage: string;
  role: string;
  bio: string;
  languagesSpoken: any[];
  interests: {
    professional_interests: any[];
    personal_interests: any[];
  };
  previousEducation: PreviousEducationItem[];
  links: {
    cv: string;
    portfolio: string;
    github: string;
    linkedin: string;
    twitter: string;
  };
  stack: StackItem[];
  notifications: boolean;
  darkMode: boolean;
  education: string;
  projects: string;
  employment: string;
}

interface PreviousEducationItem {
  school: string;
  subject: string;
  level: string;
}

import { StackItem } from "src/app/shared/store/stack.models";

export interface Profile {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  location: any;
  nationality: any;
  profileImage: string;
  coverImage: string;
  path: any;
  bio: string;
  languagesSpoken: any[];
  interests: {
    professional_interests: any[];
    personal_interests: any[];
  };
  previousEducation: PreviousEducationItem[];
  github?: {
    id: string;
    username: string;
  };
  links: {
    cv: string;
    portfolio: string;
    linkedIn: string;
    twitter: string;
  };
  stack: StackItem[];
  notifications: boolean;
  theme: "light" | "dark";
  preferredLanguage: string;
  education: string;
  projects: string;
  employment: string;
}

interface PreviousEducationItem {
  school: string;
  subject: string;
  level: any;
}

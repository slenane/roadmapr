import { StackItem } from "src/app/shared/store/stack.models";

export interface Profile {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  nationality: string;
  profileImage: string;
  coverImage: string;
  path: string;
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
  theme: "light" | "dark";
  preferredLanguage: string;
  education: string;
  projects: string;
  employment: string;
}

interface PreviousEducationItem {
  school: string;
  subject: string;
  level: string;
}

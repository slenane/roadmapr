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
    professionalInterests: any[];
    personalInterests: any[];
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
    x: string;
  };
  stack: StackItem[];
  notifications: boolean;
  theme: "light" | "dark";
  preferredLanguage: string;
  education: string;
  educationList: any[];
  projects: string;
  projectList: any[];
  experience: string;
  experienceList: any[];
}

interface PreviousEducationItem {
  school: string;
  subject: string;
  level: any;
}

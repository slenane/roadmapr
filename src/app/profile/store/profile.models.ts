export interface Profile {
  _id: string;
  username: string;
  name: string;
  location: string;
  nationality: string;
  profileImage: string;
  coverImage: string;
  role: string;
  bio: string;
  github: string;
  linkedIn: string;
  twitter: string;
  cv: string;
  skills: any[];
  languagesSpoken: any[];
  education: string;
  projects: string;
  employment: string;
  theme: string;
  notifications: boolean;
  email: string;
}

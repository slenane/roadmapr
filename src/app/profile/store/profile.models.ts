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
  previousEducation: previousEducationItem[];
  links: {
    cv: string;
    portfolio: string;
    github: string;
    linkedin: string;
    twitter: string;
  };
  notifications: boolean;
  darkMode: boolean;
  education: string;
  projects: string;
  employment: string;
}

interface previousEducationItem {
  school: string;
  subject: string;
  level: string;
}

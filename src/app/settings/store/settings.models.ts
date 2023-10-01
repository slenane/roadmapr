export interface Settings {
  userId: string;
  theme: "light" | "dark";
  preferredLanguage: "en" | "es" | "pt";
  notifications: boolean;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  github: {
    id: string;
    username: string;
  };
}

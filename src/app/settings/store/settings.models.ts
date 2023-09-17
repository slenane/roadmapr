export interface Settings {
  _id: string;
  theme: "light" | "dark";
  preferredLanguage: "en" | "es" | "pt";
  notifications: boolean;
  username: string;
  email: string;
  // password: string;
}

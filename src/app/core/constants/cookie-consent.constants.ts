import { NgcCookieConsentConfig } from "ngx-cookieconsent";

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: "www.roadmapr.dev",
  },
  palette: {
    popup: {
      background: "#424242",
    },
    button: {
      background: "#00bcd4",
      text: "##fff",
    },
  },
  theme: "classic",
  position: "bottom",
  type: "info",
  content: {
    message:
      "This website uses cookies to ensure you get the best experience on our website.",
    dismiss: "Got it!",
    link: "Learn more",
    href: "/privacy-policy",
    policy: "Privacy Policy",
  },
};

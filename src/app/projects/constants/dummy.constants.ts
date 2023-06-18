import { Projects } from "../store/projects.models";

export const DUMMY_PROJECTS: Projects = {
  projectList: [
    {
      description: "Goal tracker",
      github: "www.github.com",
      link: "www.link.com",
      notes: "",
      stack: [
        { title: "HTML", name: "html5" },
        { title: "CSS", name: "css3" },
        { title: "JavaScript", name: "javascript" },
        { title: "Bootstrap", name: "bootstrap" },
        { title: "MongoDB", name: "mongodb" },
        { title: "Node.js", name: "nodejs" },
      ],
      startDate: new Date(
        "Sun May 28 2023 19:34:42 GMT+0200 (Central European Summer Time)"
      ),
      tagLine: "Application to easily track goals",
      title: "Goal Tracker",
      todo: "",
      _id: "1",
    },
    {
      description: "Collection of chess.com's daily puzzle",
      github: "www.github.com",
      link: "www.link.com",
      notes: "",
      stack: [
        { title: "HTML", name: "html5" },
        { title: "CSS", name: "css3" },
        { title: "JavaScript", name: "javascript" },
        { title: "Bootstrap", name: "bootstrap" },
        { title: "MongoDB", name: "mongodb" },
        { title: "Node.js", name: "nodejs" },
      ],
      tagLine: "Chess.com puzzles directly from your browser",
      title: "Daily Chess Puzzle",
      todo: "",
      _id: "2",
    },
    {
      description: "Store",
      endDate: new Date(
        "Sun May 28 2023 19:34:42 GMT+0200 (Central European Summer Time)"
      ),
      github: "www.github.com",
      link: "www.link.com",
      notes: "",
      stack: [
        { title: "HTML", name: "html5" },
        { title: "CSS", name: "css3" },
        { title: "JavaScript", name: "javascript" },
        { title: "Bootstrap", name: "bootstrap" },
        { title: "MongoDB", name: "mongodb" },
        { title: "Node.js", name: "nodejs" },
      ],
      startDate: new Date(
        "Sun May 28 2023 19:34:42 GMT+0200 (Central European Summer Time)"
      ),
      tagLine: "Store with shopify integration",
      title: "Sacred Tribe Energy Healing",
      todo: "",
      _id: "3",
    },
  ],
  user: "123",
  _id: "123",
};

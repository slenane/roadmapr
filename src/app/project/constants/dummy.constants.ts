import { Projects } from "../store/project.models";

export const DUMMY_PROJECTS: Projects = {
  projectList: [
    {
      description: "Goal tracker",
      // endDate?: Date;
      github: "www.github.com",
      // link?: String;
      stack: [
        { title: "HTML", name: "html5" },
        { title: "CSS", name: "css3" },
        { title: "JavaScript", name: "javascript" },
        { title: "Bootstrap", name: "bootstrap" },
        { title: "MongoDB", name: "mongodb" },
        { title: "Node.js", name: "nodejs" },
      ],
      // startDate?: Date;
      title: "Goal Tracker",
      topics: ["Lifestyle"],
      _id: "1",
    },
    {
      description: "Collection of chess.com's daily puzzle",
      // endDate?: Date;
      github: "www.github.com",
      // link?: String;
      stack: [
        { title: "HTML", name: "html5" },
        { title: "CSS", name: "css3" },
        { title: "JavaScript", name: "javascript" },
        { title: "Bootstrap", name: "bootstrap" },
        { title: "MongoDB", name: "mongodb" },
        { title: "Node.js", name: "nodejs" },
      ],
      // startDate?: Date;
      title: "Daily Chess Puzzle",
      topics: ["Games"],
      _id: "2",
    },
    {
      description: "Store",
      // endDate?: Date;
      github: "www.github.com",
      // link?: String;
      stack: [
        { title: "HTML", name: "html5" },
        { title: "CSS", name: "css3" },
        { title: "JavaScript", name: "javascript" },
        { title: "Bootstrap", name: "bootstrap" },
        { title: "MongoDB", name: "mongodb" },
        { title: "Node.js", name: "nodejs" },
      ],
      // startDate?: Date;
      title: "Sacred Tribe Energy Healing",
      topics: ["Retail"],
      _id: "3",
    },
  ],
  user: "123",
  _id: "123",
};

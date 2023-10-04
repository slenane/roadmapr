export const QUESTION_NUMBERS = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
};
export const QUESTION_OPTIONS = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
};

// *** = 3 points
// ** = 2 points
// * = 1 point

export const DEVELOPER_PATH_QUESTIONS = [
  {
    question: "What aspect of software development interests you the most?",
    answers: {
      A: "Designing how a website looks and feels.", // FRONTEND***
      B: "Working on the logic and databases that support a website.", //BACKEND***
      C: "Creating applications for mobile devices.", // MOBILE***
      D: "Designing and developing video games.", // GAMES***
      E: "Not Sure.", // FULL-STACK*
    },
  },
  {
    question: "Which device are you most excited to develop applications for?",
    answers: {
      A: "Desktops and laptops", // FRONTEND*** | BACKEND*
      B: "Servers and databases", // BACKEND*** | MOBILE*
      C: "Game consoles and platforms", // GAMES*** | MOBILE*
      D: "Smartphones and tablets", // MOBILE*** | GAMES*
      E: "Not Sure.", // FULL-STACK*
    },
  },
  {
    question:
      "Imagine you're building a website. What aspect would you find most exciting?",
    answers: {
      A: "Designing how the buttons, menus, and images look and feel.", // FRONTEND*** | MOBILE*
      B: "Creating the behind-the-scenes logic that makes the website work.", //BACKEND***
      C: "Developing an application that people can use on their phones or tablets.", // MOBILE*** | FRONTEND* | GAMES*
      D: "Having the ability to work on both the visual design and the technical functionality.", // FULL-STACK*** | MOBILE**
      E: "Not Sure.", // FULL-STACK*
    },
  },
  {
    question:
      "Picture a project where you have to bring an idea to life. What kind of idea excites you the most?",
    answers: {
      A: "Designing and crafting a captivating and user-friendly website.", // FRONTEND***
      B: "Building the infrastructure and logic that drives the application.", // BACKEND***
      C: "Developing an application tailored for mobile devices like phones or tablets.", //  MOBILE*** | GAMES**
      D: "Being able to handle all aspects of a project from the frontend to the backend.", // FULL-STACK*** | MOBILE**
      E: "Not Sure.", // FULL-STACK*
    },
  },
  {
    question:
      "If you were to compare software development to building a house, which role would you be most interested in?",
    answers: {
      A: "The interior designer, focusing on the look and feel of rooms.", // FRONTEND***
      B: "The structural engineer, designing the framework and support systems.", //BACKEND***
      C: "The architect, crafting a functional and beautiful living space.", // MOBILE*** | GAMES***
      D: "The general contractor, overseeing and working on all aspects of construction.", // FULL-STACK*** | MOBILE*
      E: "Not Sure.", // FULL-STACK*
    },
  },
];

export const RECOMMENDED_PATHS = {
  frontend: {
    title: "PATHS.TITLES.FRONTEND",
    description: "PATHS.DETAILED_DESCRIPTIONS.FRONTEND",
  },
  backend: {
    title: "PATHS.TITLES.BACKEND",
    description: "PATHS.DETAILED_DESCRIPTIONS.BACKEND",
  },
  fullStack: {
    title: "PATHS.TITLES.FULL_STACK",
    description: "PATHS.DETAILED_DESCRIPTIONS.FULL_STACK",
  },
  game: {
    title: "PATHS.TITLES.GAME",
    description: "PATHS.DETAILED_DESCRIPTIONS.GAME",
  },
  mobile: {
    title: "PATHS.TITLES.MOBILE",
    description: "PATHS.DETAILED_DESCRIPTIONS.MOBILE",
  },
};

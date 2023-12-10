export interface IDeveloperPath {
  id: number;
  name: string;
}

export interface IDeveloperStack {
  id: number;
  name: string;
}

export interface IStackItem {
  title: string;
  name: string;
  type: string;
}

export interface IStackItemCount {
  title: string;
  name: string;
  type: string;
  count: number;
  list: "core" | "choice" | "bonus";
  first?: boolean;
}

export interface IStack {
  type: IDeveloperStack;
  path: IDeveloperPath;
  title: string;
  stack: {
    core: IStackItem[];
    choice?: IStackItem[];
    bonus?: IStackItem[];
  };
  description: string;
}

export interface IDeveloperStacks {
  [key: string]: IStack[];
}

export const DEV_PATHS: IDeveloperPath[] = [
  { id: 0, name: "PATHS.TITLES.FRONTEND" },
  { id: 1, name: "PATHS.TITLES.BACKEND" },
  { id: 2, name: "PATHS.TITLES.FULL_STACK" },
  { id: 3, name: "PATHS.TITLES.GAME" },
  { id: 4, name: "PATHS.TITLES.MOBILE" },
];

export const DEV_STACKS: IStack[] = [
  {
    type: { id: 1, name: "react" },
    path: { id: 0, name: "PATHS.TITLES.FRONTEND" },
    title: "STACKS.TITLES.REACT",
    description: "STACKS.DESCRIPTIONS.REACT",
    stack: {
      core: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "React", name: "react", type: "frontend" },
        { title: "Redux", name: "redux", type: "frontend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jest", name: "jest", type: "frontend" },
        { title: "Material UI", name: "materialui", type: "frontend" },
      ],
    },
  },
  {
    type: { id: 2, name: "vue" },
    path: { id: 0, name: "PATHS.TITLES.FRONTEND" },
    title: "STACKS.TITLES.VUE",
    description: "STACKS.DESCRIPTIONS.VUE",
    stack: {
      core: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "Vue.js", name: "vuejs", type: "frontend" },
        { title: "Vuex", name: "vuex", type: "frontend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jest", name: "jest", type: "frontend" },
      ],
    },
  },
  {
    type: { id: 3, name: "angular" },
    path: { id: 0, name: "PATHS.TITLES.FRONTEND" },
    title: "STACKS.TITLES.ANGULAR",
    description: "STACKS.DESCRIPTIONS.ANGULAR",
    stack: {
      core: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "Angular", name: "angularjs", type: "frontend" },
        { title: "NgRx", name: "ngrx", type: "frontend" },
        { title: "TypeScript", name: "typescript", type: "backend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jasmine", name: "jasmine", type: "frontend" },
        { title: "Karma", name: "karma", type: "frontend" },
      ],
    },
  },
  {
    type: { id: 4, name: "svelte" },
    path: { id: 0, name: "PATHS.TITLES.FRONTEND" },
    title: "STACKS.TITLES.SVELTE",
    description: "STACKS.DESCRIPTIONS.SVELTE",
    stack: {
      core: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "Svelte", name: "svelte", type: "frontend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
      ],
    },
  },
  {
    type: { id: 5, name: "next" },
    path: { id: 0, name: "PATHS.TITLES.FRONTEND" },
    title: "STACKS.TITLES.NEXT",
    description: "STACKS.DESCRIPTIONS.NEXT",
    stack: {
      core: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "React", name: "react", type: "frontend" },
        { title: "Redux", name: "redux", type: "frontend" },
        { title: "Next.js", name: "nextjs", type: "frontend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
      ],
    },
  },
  {
    type: { id: 6, name: "node" },
    path: { id: 1, name: "PATHS.TITLES.BACKEND" },
    title: "STACKS.TITLES.NODE",
    description: "STACKS.DESCRIPTIONS.NODE",
    stack: {
      core: [
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "Express.js", name: "express", type: "backend" },
      ],
      choice: [
        { title: "MongoDB", name: "mongodb", type: "database" },
        { title: "MySQL", name: "mysql", type: "database" },
        { title: "PostgreSQL", name: "postgresql", type: "database" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "Handlebars", name: "handlebars", type: "frontend" },
        { title: "Mocha", name: "mocha", type: "backend" },
        { title: "Jest", name: "jest", type: "frontend" },
        { title: "Docker", name: "docker", type: "backend" },
        { title: "Sequelize", name: "sequelize", type: "backend" },
      ],
    },
  },
  {
    type: { id: 7, name: "django" },
    path: { id: 1, name: "PATHS.TITLES.BACKEND" },
    title: "STACKS.TITLES.DJANGO",
    description: "STACKS.DESCRIPTIONS.DJANGO",
    stack: {
      core: [
        { title: "Python", name: "python", type: "backend" },
        { title: "Django", name: "django", type: "backend" },
      ],
      choice: [
        { title: "MySQL", name: "mysql", type: "database" },
        { title: "PostgreSQL", name: "postgresql", type: "database" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Docker", name: "docker", type: "backend" },
      ],
    },
  },
  {
    type: { id: 8, name: "ruby" },
    path: { id: 1, name: "PATHS.TITLES.BACKEND" },
    title: "STACKS.TITLES.RUBY",
    description: "STACKS.DESCRIPTIONS.RUBY",
    stack: {
      core: [
        { title: "Ruby", name: "ruby", type: "backend" },
        { title: "Rails", name: "rails", type: "backend" },
      ],
      choice: [
        { title: "MySQL", name: "mysql", type: "database" },
        { title: "PostgreSQL", name: "postgresql", type: "database" },
        { title: "SQLite", name: "sqlite", type: "database" },
        { title: "Oracle", name: "oracle", type: "database" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Docker", name: "docker", type: "backend" },
      ],
    },
  },
  {
    type: { id: 9, name: "springboot" },
    path: { id: 1, name: "PATHS.TITLES.BACKEND" },
    title: "STACKS.TITLES.SPRINGBOOT",
    description: "STACKS.DESCRIPTIONS.SPRINGBOOT",
    stack: {
      core: [
        { title: "Java", name: "java", type: "backend" },
        { title: "Spring", name: "spring", type: "backend" },
      ],
      choice: [
        { title: "MySQL", name: "mysql", type: "database" },
        { title: "PostgreSQL", name: "postgresql", type: "database" },
        { title: "SQLite", name: "sqlite", type: "database" },
        { title: "Oracle", name: "oracle", type: "database" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Docker", name: "docker", type: "backend" },
      ],
    },
  },
  {
    type: { id: 10, name: "mean" },
    path: { id: 2, name: "PATHS.TITLES.FULL_STACK" },
    title: "STACKS.TITLES.MEAN",
    description: "STACKS.DESCRIPTIONS.MEAN",
    stack: {
      core: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Angular", name: "angularjs", type: "frontend" },
        { title: "NgRx", name: "ngrx", type: "frontend" },
        { title: "TypeScript", name: "typescript", type: "backend" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "MongoDB", name: "mongodb", type: "database" },
        { title: "Express.js", name: "express", type: "backend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jasmine", name: "jasmine", type: "frontend" },
        { title: "Karma", name: "karma", type: "frontend" },
      ],
    },
  },
  {
    type: { id: 11, name: "mern" },
    path: { id: 2, name: "PATHS.TITLES.FULL_STACK" },
    title: "STACKS.TITLES.MERN",
    description: "STACKS.DESCRIPTIONS.MERN",
    stack: {
      core: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "React", name: "react", type: "frontend" },
        { title: "Redux", name: "redux", type: "frontend" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "MongoDB", name: "mongodb", type: "database" },
        { title: "Express.js", name: "express", type: "backend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "TypeScript", name: "typescript", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jest", name: "jest", type: "frontend" },
      ],
    },
  },
  {
    type: { id: 12, name: "mevn" },
    path: { id: 2, name: "PATHS.TITLES.FULL_STACK" },
    title: "STACKS.TITLES.MEVN",
    description: "STACKS.DESCRIPTIONS.MEVN",
    stack: {
      core: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Vue.js", name: "vuejs", type: "frontend" },
        { title: "Vuex", name: "vuex", type: "frontend" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "MongoDB", name: "mongodb", type: "database" },
        { title: "Express.js", name: "express", type: "backend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "TypeScript", name: "typescript", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jest", name: "jest", type: "frontend" },
      ],
    },
  },
  {
    type: { id: 13, name: "blockchain" },
    path: { id: 2, name: "PATHS.TITLES.FULL_STACK" },
    title: "STACKS.TITLES.BLOCKCHAIN",
    description: "STACKS.DESCRIPTIONS.BLOCKCHAIN",
    stack: {
      core: [
        { title: "Solidity", name: "solidity", type: "backend" },
        { title: "Truffle", name: "truffle", type: "backend" },
      ],
      choice: [
        { title: "Python", name: "python", type: "backend" },
        { title: "Django", name: "django", type: "backend" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "React", name: "react", type: "frontend" },
        { title: "Vue.js", name: "vuejs", type: "frontend" },
        { title: "Angular", name: "angularjs", type: "frontend" },
      ],
      bonus: [{ title: "Git", name: "git", type: "backend" }],
    },
  },
  {
    type: { id: 14, name: "lamp" },
    path: { id: 2, name: "PATHS.TITLES.FULL_STACK" },
    title: "STACKS.TITLES.LAMP",
    description: "STACKS.DESCRIPTIONS.LAMP",
    stack: {
      core: [
        { title: "Linux", name: "linux", type: "backend" },
        { title: "Apache", name: "apache", type: "backend" },
        { title: "MySQL", name: "mysql", type: "database" },
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
      choice: [
        { title: "Python", name: "python", type: "backend" },
        { title: "Perl", name: "perl", type: "backend" },
        { title: "PHP", name: "php", type: "backend" },
      ],
      bonus: [{ title: "Git", name: "git", type: "backend" }],
    },
  },
  {
    type: { id: 15, name: "docker" },
    path: { id: 2, name: "PATHS.TITLES.FULL_STACK" },
    title: "STACKS.TITLES.DOCKER",
    description: "STACKS.DESCRIPTIONS.DOCKER",
    stack: {
      core: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Docker", name: "docker", type: "backend" },
        { title: "Kubernetes", name: "kubernetes", type: "backend" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "Express.js", name: "express", type: "backend" },
        { title: "React", name: "react", type: "frontend" },
        { title: "Redux", name: "redux", type: "frontend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jest", name: "jest", type: "frontend" },
      ],
    },
  },
  {
    type: { id: 16, name: "unity" },
    path: { id: 3, name: "PATHS.TITLES.GAME" },
    title: "STACKS.TITLES.UNITY",
    description: "STACKS.DESCRIPTIONS.UNITY",
    stack: {
      core: [
        { title: "Unity", name: "unity", type: "backend" },
        { title: "C#", name: "csharp", type: "backend" },
        { title: "Visual Studio", name: "visualstudio", type: "backend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
    },
  },
  {
    type: { id: 17, name: "unreal" },
    path: { id: 3, name: "PATHS.TITLES.GAME" },
    title: "STACKS.TITLES.UNREAL",
    description: "STACKS.DESCRIPTIONS.UNREAL",
    stack: {
      core: [
        { title: "Unreal Engine", name: "unrealengine", type: "backend" },
        { title: "C++", name: "cplusplus", type: "backend" },
        { title: "Visual Studio", name: "visualstudio", type: "backend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
    },
  },
  {
    type: { id: 18, name: "godot" },
    path: { id: 3, name: "PATHS.TITLES.GAME" },
    title: "STACKS.TITLES.GODOT",
    description: "STACKS.DESCRIPTIONS.GODOT",
    stack: {
      core: [
        { title: "Godot", name: "godot", type: "frontend" },
        { title: "C#", name: "csharp", type: "backend" },
        { title: "Blender", name: "blender", type: "frontend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
    },
  },
  {
    type: { id: 19, name: "cocos2dx" },
    path: { id: 3, name: "PATHS.TITLES.GAME" },
    title: "STACKS.TITLES.COCOS",
    description: "STACKS.DESCRIPTIONS.COCOS",
    stack: {
      core: [
        { title: "C++", name: "cplusplus", type: "backend" },
        { title: "Lua", name: "lua", type: "backend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
    },
  },
  {
    type: { id: 20, name: "phaser" },
    path: { id: 3, name: "PATHS.TITLES.GAME" },
    title: "STACKS.TITLES.PHASER",
    description: "STACKS.DESCRIPTIONS.PHASER",
    stack: {
      core: [
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "Node.js", name: "nodejs", type: "backend" },
      ],
      bonus: [{ title: "Git", name: "git", type: "backend" }],
    },
  },
  {
    type: { id: 21, name: "react_native" },
    path: { id: 4, name: "PATHS.TITLES.MOBILE" },
    title: "STACKS.TITLES.REACT_NATIVE",
    description: "STACKS.DESCRIPTIONS.REACT_NATIVE",
    stack: {
      core: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "React", name: "react", type: "frontend" },
        { title: "React Native", name: "reactnative", type: "frontend" },
        { title: "Redux", name: "redux", type: "frontend" },
      ],
      bonus: [{ title: "Git", name: "git", type: "backend" }],
    },
  },
  {
    type: { id: 22, name: "flutter" },
    path: { id: 4, name: "PATHS.TITLES.MOBILE" },
    title: "STACKS.TITLES.FLUTTER",
    description: "STACKS.DESCRIPTIONS.FLUTTER",
    stack: {
      core: [
        { title: "Dart", name: "dart", type: "frontend" },
        { title: "Flutter", name: "flutter", type: "frontend" },
      ],
      choice: [
        { title: "Objective-C", name: "objectivec", type: "backend" },
        { title: "Swift", name: "swift", type: "backend" },
        { title: "Java", name: "java", type: "backend" },
        { title: "Kotlin", name: "kotlin", type: "backend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "MySQL", name: "mysql", type: "database" },
      ],
    },
  },
  {
    type: { id: 23, name: "swift" },
    path: { id: 4, name: "PATHS.TITLES.MOBILE" },
    title: "STACKS.TITLES.SWIFT",
    description: "STACKS.DESCRIPTIONS.SWIFT",
    stack: {
      core: [
        { title: "Swift", name: "swift", type: "backend" },
        { title: "Objective-C", name: "objectivec", type: "backend" },
      ],
      bonus: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "MySQL", name: "mysql", type: "database" },
      ],
    },
  },
  {
    type: { id: 24, name: "kotlin" },
    path: { id: 4, name: "PATHS.TITLES.MOBILE" },
    title: "STACKS.TITLES.KOTLIN",
    description: "STACKS.DESCRIPTIONS.KOTLIN",
    stack: {
      core: [
        { title: "Kotlin", name: "kotlin", type: "backend" },
        { title: "Android", name: "android", type: "frontend" },
        { title: "Java", name: "java", type: "backend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "MySQL", name: "mysql", type: "database" },
      ],
    },
  },
  {
    type: { id: 25, name: "xamarin" },
    path: { id: 4, name: "PATHS.TITLES.MOBILE" },
    title: "STACKS.TITLES.XAMARIN",
    description: "STACKS.DESCRIPTIONS.XAMARIN",
    stack: {
      core: [
        { title: "Xamarin", name: "xamarin", type: "backend" },
        { title: "C#", name: "csharp", type: "backend" },
        { title: ".NET", name: "dot-net", type: "backend" },
      ],
      bonus: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
    },
  },
];

export const CUSTOM_STACK: IStack = {
  type: { id: 0, name: "custom" },
  path: { id: 0, name: "PATHS.TITLES.FRONTEND" },
  title: "STACKS.TITLES.CUSTOM",
  description: "STACKS.DESCRIPTIONS.CUSTOM",
  stack: {
    core: [],
  },
};

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

export interface IStack {
  type: IDeveloperStack;
  title: string;
  stack: IStackItem[];
  choose?: IStackItem[];
  extras?: IStackItem[];
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

export const DEV_STACKS = {
  "PATHS.TITLES.FRONTEND": [
    {
      type: { id: 1, name: "react" },
      title: "React Stack",
      description: "STACKS.REACT",
      stack: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "React", name: "react", type: "frontend" },
        { title: "Redux", name: "redux", type: "frontend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jest", name: "jest", type: "frontend" },
        { title: "Material UI", name: "materialui", type: "frontend" },
      ],
    },
    {
      type: { id: 2, name: "vue" },
      title: "Vue.js Stack",
      description: "STACKS.VUE",
      stack: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "Vue.js", name: "vuejs", type: "frontend" },
        { title: "Vuex", name: "vuex", type: "frontend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jest", name: "jest", type: "frontend" },
      ],
    },
    {
      type: { id: 3, name: "angular" },
      title: "Angular Stack",
      description: "STACKS.ANGULAR",
      stack: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "Angular", name: "angularjs", type: "frontend" },
        { title: "NgRx", name: "ngrx", type: "frontend" },
        { title: "TypeScript", name: "typescript", type: "backend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jasmine", name: "jasmine", type: "frontend" },
        { title: "Karma", name: "karma", type: "frontend" },
      ],
    },
    {
      type: { id: 4, name: "svelte" },
      title: "Svelte Stack",
      description: "STACKS.SVELTE",
      stack: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "Svelte", name: "svelte", type: "frontend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
      ],
    },
    {
      type: { id: 5, name: "next" },
      title: "Next.js Stack",
      description: "STACKS.NEXT",
      stack: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "React", name: "react", type: "frontend" },
        { title: "Redux", name: "redux", type: "frontend" },
        { title: "Next.js", name: "nextjs", type: "frontend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
      ],
    },
  ],
  "PATHS.TITLES.BACKEND": [
    {
      type: { id: 6, name: "node" },
      title: "Node.js Stack",
      description: "STACKS.NODE",
      stack: [
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "Express.js", name: "express", type: "backend" },
      ],
      choose: [
        { title: "MongoDB", name: "mongodb", type: "database" },
        { title: "MySQL", name: "mysql", type: "database" },
        { title: "PostgreSQL", name: "postgresql", type: "database" },
      ],
      extras: [
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
    {
      type: { id: 7, name: "django" },
      title: "Django Stack",
      description: "STACKS.DJANGO",
      stack: [
        { title: "Python", name: "python", type: "backend" },
        { title: "Django", name: "django", type: "backend" },
      ],
      choose: [
        { title: "MySQL", name: "mysql", type: "database" },
        { title: "PostgreSQL", name: "postgresql", type: "database" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "MySQL", name: "mysql", type: "database" },
        { title: "PostgreSQL", name: "postgresql", type: "database" },
        { title: "Docker", name: "docker", type: "backend" },
      ],
    },
    {
      type: { id: 8, name: "ruby" },
      title: "Ruby on Rails Stack",
      description: "STACKS.RUBY",
      stack: [
        { title: "Ruby", name: "ruby", type: "backend" },
        { title: "Rails", name: "rails", type: "backend" },
      ],
      choose: [
        { title: "MySQL", name: "mysql", type: "database" },
        { title: "PostgreSQL", name: "postgresql", type: "database" },
        { title: "SQLite", name: "sqlite", type: "database" },
        { title: "Oracle", name: "oracle", type: "database" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Docker", name: "docker", type: "backend" },
      ],
    },
    {
      type: { id: 9, name: "springboot" },
      title: "Spring Boot Stack",
      description: "STACKS.SPRINGBOOT",
      stack: [
        { title: "Java", name: "java", type: "backend" },
        { title: "Spring", name: "spring", type: "backend" },
      ],
      choose: [
        { title: "MySQL", name: "mysql", type: "database" },
        { title: "PostgreSQL", name: "postgresql", type: "database" },
        { title: "SQLite", name: "sqlite", type: "database" },
        { title: "Oracle", name: "oracle", type: "database" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Docker", name: "docker", type: "backend" },
      ],
    },
  ],
  "PATHS.TITLES.FULL_STACK": [
    {
      type: { id: 10, name: "mean" },
      title: "MEAN Stack",
      description: "STACKS.MEAN",
      stack: [
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
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jasmine", name: "jasmine", type: "frontend" },
        { title: "Karma", name: "karma", type: "frontend" },
      ],
    },
    {
      type: { id: 11, name: "mern" },
      title: "MERN Stack",
      description: "STACKS.MERN",
      stack: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "React", name: "react", type: "frontend" },
        { title: "Redux", name: "redux", type: "frontend" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "MongoDB", name: "mongodb", type: "database" },
        { title: "Express.js", name: "express", type: "backend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "TypeScript", name: "typescript", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jest", name: "jest", type: "frontend" },
      ],
    },
    {
      type: { id: 12, name: "mevn" },
      title: "MEVN Stack",
      description: "STACKS.MEVN",
      stack: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Vue.js", name: "vuejs", type: "frontend" },
        { title: "Vuex", name: "vuex", type: "frontend" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "MongoDB", name: "mongodb", type: "database" },
        { title: "Express.js", name: "express", type: "backend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "TypeScript", name: "typescript", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jest", name: "jest", type: "frontend" },
      ],
    },
    {
      type: { id: 13, name: "blockchain" },
      title: "Blockchain Stack",
      description: "STACKS.BLOCKCHAIN",
      stack: [
        { title: "Solidity", name: "solidity", type: "backend" },
        { title: "Truffle", name: "truffle", type: "backend" },
      ],
      choose: [
        { title: "Python", name: "python", type: "backend" },
        { title: "Django", name: "django", type: "backend" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "React", name: "react", type: "frontend" },
        { title: "Vue.js", name: "vuejs", type: "frontend" },
        { title: "Angular", name: "angularjs", type: "frontend" },
      ],
      extras: [{ title: "Git", name: "git", type: "backend" }],
    },
    {
      type: { id: 14, name: "lamp" },
      title: "LAMP Stack",
      description: "STACKS.LAMP",
      stack: [
        { title: "Linux", name: "linux", type: "backend" },
        { title: "Apache", name: "apache", type: "backend" },
        { title: "MySQL", name: "mysql", type: "database" },
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
      choose: [
        { title: "Python", name: "python", type: "backend" },
        { title: "Perl", name: "perl", type: "backend" },
        { title: "PHP", name: "php", type: "backend" },
      ],
      extras: [{ title: "Git", name: "git", type: "backend" }],
    },
    {
      type: { id: 15, name: "docker" },
      title: "Dockerized Stack",
      description: "STACKS.DOCKER",
      stack: [
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
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Babel", name: "babel", type: "frontend" },
        { title: "Webpack", name: "webpack", type: "backend" },
        { title: "Jest", name: "jest", type: "frontend" },
      ],
    },
  ],
  "PATHS.TITLES.GAME": [
    {
      type: { id: 16, name: "unity" },
      title: "Unity Stack",
      description: "STACKS.UNITY",
      stack: [
        { title: "Unity", name: "unity", type: "backend" },
        { title: "C#", name: "csharp", type: "backend" },
        { title: "Visual Studio", name: "visualstudio", type: "backend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
    },
    {
      type: { id: 17, name: "unreal" },
      title: "Unreal Engine Stack",
      description: "STACKS.UNREAL",
      stack: [
        { title: "Unreal Engine", name: "unrealengine", type: "backend" },
        { title: "C++", name: "cplusplus", type: "backend" },
        { title: "Visual Studio", name: "visualstudio", type: "backend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
    },
    {
      type: { id: 18, name: "godot" },
      title: "Godot Stack",
      description: "STACKS.GODOT",
      stack: [
        { title: "Godot", name: "godot", type: "frontend" },
        { title: "C#", name: "csharp", type: "backend" },
        { title: "Blender", name: "blender", type: "frontend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
    },
    {
      type: { id: 19, name: "cocos2dx" },
      title: "Cocos2d-x Stack",
      description: "STACKS.COCOS",
      stack: [
        { title: "C++", name: "cplusplus", type: "backend" },
        { title: "Lua", name: "lua", type: "backend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
    },
    {
      type: { id: 20, name: "phaser" },
      title: "Phaser Stack",
      description: "STACKS.PHASER",
      stack: [
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "Node.js", name: "nodejs", type: "backend" },
      ],
      extras: [{ title: "Git", name: "git", type: "backend" }],
    },
  ],
  "PATHS.TITLES.MOBILE": [
    {
      type: { id: 21, name: "react_native" },
      title: "React Native Stack",
      description: "STACKS.REACT_NATIVE",
      stack: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "Node.js", name: "nodejs", type: "backend" },
        { title: "React", name: "react", type: "frontend" },
        { title: "React Native", name: "reactnative", type: "frontend" },
        { title: "Redux", name: "redux", type: "frontend" },
      ],
      extras: [{ title: "Git", name: "git", type: "backend" }],
    },
    {
      type: { id: 22, name: "flutter" },
      title: "Flutter Stack",
      description: "STACKS.FLUTTER",
      stack: [
        { title: "Dart", name: "dart", type: "frontend" },
        { title: "Flutter", name: "flutter", type: "frontend" },
      ],
      choose: [
        { title: "Objective-C", name: "objectivec", type: "backend" },
        { title: "Swift", name: "swift", type: "backend" },
        { title: "Java", name: "java", type: "backend" },
        { title: "Kotlin", name: "kotlin", type: "backend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "MySQL", name: "mysql", type: "database" },
      ],
    },
    {
      type: { id: 23, name: "swift" },
      title: "Swift Stack",
      description: "STACKS.SWIFT",
      stack: [
        { title: "Swift", name: "swift", type: "backend" },
        { title: "Objective-C", name: "objectivec", type: "backend" },
      ],
      extras: [
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "MySQL", name: "mysql", type: "database" },
      ],
    },
    {
      type: { id: 24, name: "kotlin" },
      title: "Kotlin Stack",
      description: "STACKS.KOTLIN",
      stack: [
        { title: "Kotlin", name: "kotlin", type: "backend" },
        { title: "Android", name: "android", type: "frontend" },
        { title: "Java", name: "java", type: "backend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "MySQL", name: "mysql", type: "database" },
      ],
    },
    {
      type: { id: 25, name: "xamarin" },
      title: "Xamarin Stack",
      description: "STACKS.XAMARIN",
      stack: [
        { title: "Xamarin", name: "xamarin", type: "backend" },
        { title: "C#", name: "csharp", type: "backend" },
        { title: ".NET", name: "dot-net", type: "backend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
    },
  ],
};

export const CUSTOM_STACK: IStack = {
  title: "Custom Stack",
  type: { id: 0, name: "custom" },
  stack: [],
  description: "STACKS.CUSTOM",
};

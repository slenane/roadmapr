export const DEV_PATHS = [
  { id: 0, name: "PATHS.TITLES.FRONTEND" },
  { id: 1, name: "PATHS.TITLES.BACKEND" },
  { id: 2, name: "PATHS.TITLES.FULL_STACK" },
  { id: 3, name: "PATHS.TITLES.GAME" },
  { id: 4, name: "PATHS.TITLES.MOBILE" },
];

export const DEV_STACKS = {
  "PATHS.TITLES.FRONTEND": {
    react: {
      title: "React Stack",
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
    vue: {
      title: "Vue.js Stack",
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
    angular: {
      title: "Angular Stack",
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
    svelte: {
      title: "Svelte Stack",
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
    next: {
      title: "Next.js Stack",
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
  },
  "PATHS.TITLES.BACKEND": {
    node: {
      title: "Node.jsStack",
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
    django: {
      title: "Django Stack",
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
    ruby: {
      title: "Ruby on Rails Stack",
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
    springboot: {
      title: "Spring Boot Stack",
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
  },
  "PATHS.TITLES.FULL_STACK": {
    mean: {
      title: "MEAN Stack",
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
    mern: {
      title: "MERN Stack",
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
    mevn: {
      title: "MEVN Stack",
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
    lamp: {
      title: "LAMP Stack",
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
    docker: {
      title: "Dockerized Stack",
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
  },
  "PATHS.TITLES.GAME": {
    unity: {
      title: "Unity Stack",
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
    unreal: {
      title: "Unreal Engine Stack",
      stack: [
        { title: "Unreal Engine", name: "unrealengine", type: "backend" },
        { title: "C#", name: "csharp", type: "backend" },
        { title: "Visual Studio", name: "visualstudio", type: "backend" },
      ],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
    },
    godot: {
      title: "Godot Stack",
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
    cocos2dx: {
      title: "",
      stack: [{ title: "C++", name: "cplusplus", type: "backend" }],
      extras: [
        { title: "Git", name: "git", type: "backend" },
        { title: "Lua", name: "lua", type: "backend" },
        { title: "JavaScript", name: "javascript", type: "full-stack" },
      ],
    },
    phaser: {
      title: "Phaser Stack",
      stack: [
        { title: "JavaScript", name: "javascript", type: "full-stack" },
        { title: "HTML", name: "html5", type: "frontend" },
        { title: "CSS", name: "css3", type: "frontend" },
        { title: "Node.js", name: "nodejs", type: "backend" },
      ],
      extras: [{ title: "Git", name: "git", type: "backend" }],
    },
  },
  "PATHS.TITLES.MOBILE": {
    react_native: {
      title: "React Native Stack",
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
    flutter: {
      title: "Flutter Stack",
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
    swift: {
      title: "Swift Stack",
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
    kotlin: {
      title: "Kotlin Stack",
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
    xamarin: {
      title: "Xamarin Stack",
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
  },
};

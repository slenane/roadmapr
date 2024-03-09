import { Component, OnInit } from "@angular/core";
import { IStack } from "src/app/shared/constants/dev-paths.constants";

@Component({
  selector: "app-demo-stack",
  templateUrl: "./demo-stack.component.html",
  styleUrls: ["./demo-stack.component.scss"],
})
export class DemoStackComponent implements OnInit {
  public stackGridOne: any[] = [];
  public stackGridTwo: any[] = [];
  public activeStack: IStack = {
    type: {
      id: 10,
      name: "mean",
    },
    path: {
      id: 2,
      name: "PATHS.TITLES.FULL_STACK",
    },
    title: "STACKS.TITLES.MEAN",
    description: "STACKS.DESCRIPTIONS.MEAN",
    stack: {
      core: [
        {
          title: "HTML",
          name: "html5",
          type: "frontend",
        },
        {
          title: "CSS",
          name: "css3",
          type: "frontend",
        },
        {
          title: "JavaScript",
          name: "javascript",
          type: "full-stack",
        },
        {
          title: "Angular",
          name: "angularjs",
          type: "frontend",
        },
        {
          title: "NgRx",
          name: "ngrx",
          type: "frontend",
        },
        {
          title: "TypeScript",
          name: "typescript",
          type: "backend",
        },
        {
          title: "Node.js",
          name: "nodejs",
          type: "backend",
        },
        {
          title: "MongoDB",
          name: "mongodb",
          type: "database",
        },
        {
          title: "Express.js",
          name: "express",
          type: "backend",
        },
      ],
      bonus: [
        {
          title: "Git",
          name: "git",
          type: "backend",
        },
        {
          title: "Babel",
          name: "babel",
          type: "frontend",
        },
        {
          title: "Webpack",
          name: "webpack",
          type: "backend",
        },
        {
          title: "Jasmine",
          name: "jasmine",
          type: "frontend",
        },
        {
          title: "Karma",
          name: "karma",
          type: "frontend",
        },
      ],
    },
  };
  public showStackSubHeaders = true;
  public stackListInitial = {
    javascript: {
      count: 0,
      percentage: 0,
      language: {
        name: "javascript",
        title: "JavaScript",
        type: "full-stack",
      },
    },
    html5: {
      count: 0,
      percentage: 0,
      language: {
        name: "html5",
        title: "HTML",
        type: "frontend",
      },
    },
    css3: {
      count: 0,
      percentage: 0,
      language: {
        name: "css3",
        title: "CSS",
        type: "frontend",
      },
    },
    nodejs: {
      count: 0,
      percentage: 0,
      language: {
        name: "nodejs",
        title: "Node.js",
        type: "backend",
      },
    },
    angularjs: {
      count: 0,
      percentage: 0,
      language: {
        name: "angularjs",
        title: "Angular",
        type: "frontend",
      },
    },
    typescript: {
      count: 0,
      percentage: 0,
      language: {
        name: "typescript",
        title: "TypeScript",
        type: "backend",
      },
    },
    mongodb: {
      count: 0,
      percentage: 0,
      language: {
        name: "mongodb",
        title: "MongoDB",
        type: "database",
      },
    },

    express: {
      count: 0,
      percentage: 0,
      language: {
        name: "express",
        title: "Express.js",
        type: "backend",
      },
    },
    ngrx: {
      count: 0,
      percentage: 0,
      language: {
        name: "ngrx",
        title: "NgRx",
        type: "frontend",
      },
    },
    babel: {
      count: 0,
      percentage: 0,
      language: {
        name: "babel",
        title: "Babel",
        type: "frontend",
      },
    },

    jasmine: {
      count: 0,
      percentage: 0,
      language: {
        name: "jasmine",
        title: "Jasmine",
        type: "frontend",
      },
    },

    karma: {
      count: 0,
      percentage: 0,
      language: {
        name: "karma",
        title: "Karma",
        type: "frontend",
      },
    },

    webpack: {
      count: 0,
      percentage: 0,
      language: {
        name: "webpack",
        title: "Webpack",
        type: "backend",
      },
    },
  };
  public stackListFinal: any = {
    angularjs: {
      count: 4,
      language: {
        name: "angularjs",
        title: "Angular",
        type: "frontend",
      },
    },
    babel: {
      count: 1,
      language: {
        name: "babel",
        title: "Babel",
        type: "frontend",
      },
    },
    css3: {
      count: 8,
      language: {
        name: "css3",
        title: "CSS",
        type: "frontend",
      },
    },
    express: {
      count: 2,
      language: {
        name: "express",
        title: "Express.js",
        type: "backend",
      },
    },
    html5: {
      count: 8,
      language: {
        name: "html5",
        title: "HTML",
        type: "frontend",
      },
    },
    jasmine: {
      count: 2,
      language: {
        name: "jasmine",
        title: "Jasmine",
        type: "frontend",
      },
    },
    javascript: {
      count: 12,
      language: {
        name: "javascript",
        title: "JavaScript",
        type: "full-stack",
      },
    },
    karma: {
      count: 2,
      language: {
        name: "karma",
        title: "Karma",
        type: "frontend",
      },
    },
    mongodb: {
      count: 4,
      language: {
        name: "mongodb",
        title: "MongoDB",
        type: "database",
      },
    },
    ngrx: {
      count: 1,
      language: {
        name: "ngrx",
        title: "NgRx",
        type: "frontend",
      },
    },
    nodejs: {
      count: 5,
      language: {
        name: "nodejs",
        title: "Node.js",
        type: "backend",
      },
    },

    typescript: {
      count: 4,
      language: {
        name: "typescript",
        title: "TypeScript",
        type: "backend",
      },
    },
    webpack: {
      count: 1,
      language: {
        name: "webpack",
        title: "Webpack",
        type: "backend",
      },
    },
  };

  constructor() {}

  ngOnInit(): void {
    this.resetLists();
    this.increaseCounts(this.stackListInitial, this.stackListFinal);

    setInterval(() => {
      this.resetLists();
      this.increaseCounts(this.stackListInitial, this.stackListFinal);
    }, 50000);
  }

  getPercentageValue(number: number): number {
    return number * (100 / 12);
  }

  increaseCounts(obj1: any, obj2: any) {
    const keys = Object.keys(obj1);

    keys.forEach((key) => {
      const initialCount = obj1[key].count;
      const finalCount = obj2[key].count;
      const difference = finalCount - initialCount;
      const increment = difference / 10;

      const intervalId = setInterval(() => {
        const found =
          this.stackGridOne.find((item) => item.name === key) ||
          this.stackGridTwo.find((item) => item.name === key);

        if (Math.floor(found.count + increment) > 0) {
          if (found.count < Math.floor(found.count + increment)) {
            found.percentage = this.getPercentageValue(
              Math.floor(found.count + increment)
            );
          }
        }

        found.count += increment;

        if (found.count >= finalCount) {
          clearInterval(intervalId);
        }
      }, 4000);
    });
  }

  roundDown(num: number) {
    return Math.floor(num);
  }

  resetLists() {
    this.stackGridOne = [
      {
        title: "JavaScript",
        name: "javascript",
        type: "full-stack",
        count: 0,
        percentage: 0,
        list: "core",
        first: true,
      },
      {
        title: "HTML",
        name: "html5",
        type: "frontend",
        count: 0,
        percentage: 0,
        list: "core",
      },
      {
        title: "CSS",
        name: "css3",
        type: "frontend",
        count: 0,
        percentage: 0,
        list: "core",
      },
      {
        title: "Node.js",
        name: "nodejs",
        type: "backend",
        count: 0,
        percentage: 0,
        list: "core",
      },
      {
        title: "Angular",
        name: "angularjs",
        type: "frontend",
        count: 0,
        percentage: 0,
        list: "core",
      },
      {
        title: "TypeScript",
        name: "typescript",
        type: "backend",
        count: 0,
        percentage: 0,
        list: "core",
      },
      {
        title: "MongoDB",
        name: "mongodb",
        type: "database",
        count: 0,
        percentage: 0,
        list: "core",
      },
    ];
    this.stackGridTwo = [
      {
        title: "Express.js",
        name: "express",
        type: "backend",
        count: 0,
        percentage: 0,
        list: "core",
      },
      {
        title: "NgRx",
        name: "ngrx",
        type: "frontend",
        count: 0,
        percentage: 0,
        list: "core",
      },
      {
        title: "Jasmine",
        name: "jasmine",
        type: "frontend",
        count: 0,
        percentage: 0,
        list: "bonus",
        first: true,
      },
      {
        title: "Karma",
        name: "karma",
        type: "frontend",
        count: 0,
        percentage: 0,
        list: "bonus",
      },
      {
        title: "Webpack",
        name: "webpack",
        type: "backend",
        count: 0,
        percentage: 0,
        list: "bonus",
      },
      {
        title: "Babel",
        name: "babel",
        type: "frontend",
        count: 0,
        percentage: 0,
        list: "bonus",
      },
      {
        title: "Git",
        name: "git",
        type: "backend",
        count: 0,
        percentage: 0,
        list: "bonus",
      },
    ];
  }
}

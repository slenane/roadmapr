import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from "@angular/animations";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MEDIA_QUERIES } from "src/app/shared/constants/breakpoints.constants";

@Component({
  selector: "app-demo-drop-list",
  templateUrl: "./demo-drop-list.component.html",
  styleUrls: ["./demo-drop-list.component.scss"],
  animations: [
    trigger("wobble", [
      transition("void => *", [
        animate(
          ".7s ease",
          keyframes([
            style({
              transform: "translate3d(0%, 0, 0) rotate3d(0, 0, 1, -2deg)",
              offset: 0.05,
            }),
            style({
              transform: "translate3d(0%, 0, 0) rotate3d(0, 0, 1, 2deg)",
              offset: 0.2,
            }),
            style({
              transform: "translate3d(0%, 0, 0) rotate3d(0, 0, 1, -1deg)",
              offset: 0.4,
            }),
            style({
              transform: "translate3d(0%, 0, 0) rotate3d(0, 0, 1, 1deg)",
              offset: 0.6,
            }),
            style({ transform: "none", offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class DemoDropListComponent implements OnInit {
  public todo: any[];
  public inProgress: any[];
  public done: any[];
  public isMobileDevice = false;

  movePaused: boolean = false;
  interval: any;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.resetItems();

    this.breakpointObserver
      .observe(MEDIA_QUERIES.BREAKPOINTS)
      .subscribe((result) => {
        this.isMobileDevice = MEDIA_QUERIES.MOBILE.find(
          (size) => result.breakpoints[size]
        )
          ? true
          : false;

        if (this.isMobileDevice) {
          this.pauseAutoMove();
        } else {
          this.interval = setInterval(() => {
            this.moveItems();
          }, 4000);
        }
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  pauseAutoMove() {
    clearInterval(this.interval);
  }

  moveItems() {
    if (!this.movePaused) {
      if (this.inProgress.length === 0 && this.todo.length > 0) {
        this.moveItemFromTodoToInProgress();
      } else if (this.inProgress.length > 0) {
        this.moveItemFromInProgressToDone();
      }
    }
  }

  moveItemFromInProgressToDone() {
    if (this.inProgress.length === 0) return;

    const itemIndex = 0; // Move the first item from inProgress to done

    if (this.done.length === 4) {
      this.resetItems();
      return;
    }

    transferArrayItem(this.inProgress, this.done, itemIndex, this.done.length);
  }

  moveItemFromTodoToInProgress() {
    if (this.todo.length === 0) return;

    const itemIndex = 0; // Move the first item from todo to inProgress
    transferArrayItem(
      this.todo,
      this.inProgress,
      itemIndex,
      this.inProgress.length
    );
  }

  resetItems() {
    this.todo = [
      {
        title: "Eloquent JavaScript",
        startDate: "2023-08-31T22:00:00.000Z",
        endDate: "2023-10-03T22:00:00.000Z",
        author: "Marijn Haverbeke",
        link: "https://www.amazon.com/Eloquent-JavaScript-3rd-Introduction-Programming/dp/1593279507/",
        description: "",
        stack: [
          {
            title: "JavaScript",
            name: "javascript",
            type: "full-stack",
          },
        ],
        status: "done",
        position: 0,
        type: "book",
      },
      {
        title: "NodeJS - The Complete Guide",
        startDate: null,
        endDate: null,
        author: "Academind",
        link: "https://www.udemy.com/course/nodejs-the-complete-guide/",
        description: "",
        stack: [
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
            title: "MySQL",
            name: "mysql",
            type: "database",
          },
          {
            title: "GraphQL",
            name: "graphql",
            type: "backend",
          },
        ],
        status: "todo",
        position: 0,
        type: "course",
      },
      {
        title: "Pro Angular",
        startDate: null,
        endDate: null,
        isRecommended: true,
        author: "Adam Freeman",
        link: "https://www.amazon.com/Pro-Angular-Build-Powerful-Dynamic/dp/1484259971",
        description: "",
        stack: [
          {
            title: "Angular",
            name: "angularjs",
            type: "frontend",
          },
          {
            title: "TypeScript",
            name: "typescript",
            type: "backend",
          },
        ],
        status: "todo",
        position: 1,
        type: "book",
      },
      {
        title: "JavaScript30 - 30 Day Vanilla JS Coding Challenge",
        startDate: {
          $date: "2023-01-31T23:00:00.000Z",
        },
        endDate: null,
        author: "Wes Bos",
        link: "https://javascript30.com/",
        description: "",
        stack: [
          {
            title: "JavaScript",
            name: "javascript",
            type: "full-stack",
          },
        ],
        status: "inProgress",
        position: 1,
        type: "course",
      },
    ];
    this.inProgress = [
      {
        title: "CS50's Introduction to Computer Science",
        startDate: null,
        endDate: null,
        author: "HarvardX",
        link: "https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science?webview=false&campaign=CS50%27s+Introduction+to+Computer+Science&source=edx&product_category=course&placement_url=https%3A%2F%2Fwww.edx.org%2Fcs50",
        description:
          "This is CS50x , Harvard University's introduction to the intellectual enterprises of computer science and the art of programming for majors and non-majors alike, with or without prior programming experience. An entry-level course taught by David J. Malan, CS50x teaches students how to think algorithmically and solve problems efficiently. Topics include abstraction, algorithms, data structures, encapsulation, resource management, security, software engineering, and web development. Languages include C, Python, SQL, and JavaScript plus CSS and HTML. Problem sets inspired by real-world domains of biology, cryptography, finance, forensics, and gaming. The on-campus version of CS50x , CS50, is Harvard's largest course.",
        stack: [
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
            title: "Python",
            name: "python",
            type: "backend",
          },
          {
            title: "C",
            name: "c",
            type: "backend",
          },
          {
            title: "MySQL",
            name: "mysql",
            type: "database",
          },
        ],
        pinned: false,
        status: "todo",
        position: 0,
        type: "course",
      },
      {
        title: "JavaScript Algorithms and Data Structures",
        startDate: {
          $date: "2023-06-05T22:00:00.000Z",
        },
        endDate: {
          $date: "2024-01-13T11:58:00.981Z",
        },
        author: "freeCodeCamp",
        link: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
        description: "",
        stack: [
          {
            title: "JavaScript",
            name: "javascript",
            type: "full-stack",
          },
        ],
        status: "done",
        position: 2,
        type: "course",
      },
    ];
    this.done = [
      {
        title: "The Web Developer Bootcamp",
        startDate: "2023-03-31T22:00:00.000Z",
        endDate: "2023-07-06T22:00:00.000Z",
        author: "Colt Steele",
        link: "https://www.udemy.com/course/the-web-developer-bootcamp/",
        description: "",
        stack: [
          {
            title: "CSS",
            name: "css3",
            type: "frontend",
          },
          {
            title: "Express.js",
            name: "express",
            type: "backend",
          },
          {
            title: "HTML",
            name: "html5",
            type: "frontend",
          },
          {
            title: "JavaScript",
            name: "javascript",
            type: "full-stack",
          },
          {
            title: "MongoDB",
            name: "mongodb",
            type: "database",
          },
          {
            title: "Node.js",
            name: "nodejs",
            type: "backend",
          },
        ],
        status: "done",
        position: 1,
        type: "course",
      },
    ];
  }
}

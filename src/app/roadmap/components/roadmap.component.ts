import { Component, OnInit } from "@angular/core";
import { RoadmapStoreService } from "../services/roadmap-store.service";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Roadmap } from "../store/roadmap.models";
// import { GITHUB_DATA } from "../constants/roadmap.constants";
import * as moment from "moment";
import { roadmapInitialState } from "../store/roadmap.reducer";
import { IStack } from "src/app/shared/constants/dev-paths.constants";

@Component({
  selector: "app-roadmap",
  templateUrl: "./roadmap.component.html",
  styleUrls: ["./roadmap.component.scss"],
})
export class RoadmapComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public roadmap: Roadmap;
  public stack: any = {};
  public stackList: IStack[] = [];
  public distribution: any = {};
  public timeline: any = {};
  public overviewData: any = {};
  public radar: any = {};
  public github: any = [];

  constructor(private roadmapStoreService: RoadmapStoreService) {}

  ngOnInit(): void {
    this.roadmapStoreService
      .getRoadmap()
      .pipe(
        filter((state) => state != roadmapInitialState),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: (roadmap: Roadmap) => {
          this.roadmap = roadmap;
          const [education, experience, projects] =
            this.filterAndExtractData(roadmap);

          if (education.length || projects.length) {
            this.stack = this.extractStackData({ education, projects });
          }
          if (education.length || projects.length || experience.length) {
            this.distribution = this.extractStackData({
              education,
              projects,
              experience,
            });

            this.stackList = this.extractStackList({
              education,
              projects,
              experience,
            });

            // this.radar = this.extractStackRadarData({
            //   personal: [...education, ...projects],
            //   professional: experience,
            // });

            // this.timeline = this.extractTimelineData({
            //   education,
            //   projects,
            //   experience,
            // });

            // this.overviewData = this.extractOverviewData({
            //   education,
            //   projects,
            //   experience,
            // });
          }

          // if (this.roadmap.projects.length) {
          //   this.github = [...GITHUB_DATA];
          // }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  extractStackList(data: any) {
    const stack: any = [];
    for (const section in data) {
      data[section].forEach((item: any) => {
        item.stack.forEach((language: any) => {
          if (!stack.find((curr: any) => curr.name === language.name)) {
            stack.push(language);
          }
        });
      });
    }
    return stack;
  }

  extractStackData(data: any) {
    const stack: any = [];
    for (const section in data) {
      data[section].forEach((item: any) => {
        item.stack.forEach((language: any) => {
          if (!stack[language.name]) {
            stack[language.name] = { count: 0, language };
          }
          stack[language.name].count++;
        });
      });
    }

    return stack;
  }

  extractStackRadarData(data: any) {
    const stack: any = {
      personal: {},
      professional: {},
    };

    data.personal.forEach((item: any) => {
      item.stack.forEach((language: any) => {
        if (!stack["personal"][language.name]) {
          stack["personal"][language.name] = { count: 0, language };
        }
        stack["personal"][language.name].count++;
      });
    });

    data.professional.forEach((item: any) => {
      item.stack.forEach((language: any) => {
        if (!stack["professional"][language.name]) {
          stack["professional"][language.name] = { count: 0, language };
        }
        stack["professional"][language.name].count++;
      });
    });
    // data.personal.forEach((item: any) => {
    //   item.stack.forEach((language: any) => {
    //     if (!stack["personal"][language.name]) {
    //       stack["personal"][language.name] = { duration: 0, language };
    //     }
    //     stack["personal"][language.name].duration += this.getDays(
    //       item.startDate,
    //       item.endDate
    //     );
    //   });
    // });

    // data.professional.forEach((item: any) => {
    //   item.stack.forEach((language: any) => {
    //     if (!stack["professional"][language.name]) {
    //       stack["professional"][language.name] = { duration: 0, language };
    //     }
    //     stack["professional"][language.name].duration += this.getDays(
    //       item.startDate,
    //       item.endDate
    //     );
    //   });
    // });

    return stack;
  }

  // extractTimelineData(data: any) {
  //   const personalStartDate = this.getStartDate([
  //     ...data.education,
  //     ...data.projects,
  //   ]);
  //   const professionalStartDate = this.getStartDate([...data.experience]);

  //   const personalTotalTime = this.getTotalTime(personalStartDate);
  //   const professionalTotalTime = this.getTotalTime(professionalStartDate);

  //   return {
  //     personal: {
  //       startDate: personalStartDate,
  //       totalTime: personalTotalTime,
  //     },
  //     professional: {
  //       startDate: professionalStartDate,
  //       totalTime: professionalTotalTime,
  //     },
  //   };
  // }

  extractOverviewData(data: any) {
    return {
      startDate: this.getTotalTime(
        this.getStartDate([
          ...data.education,
          ...data.projects,
          ...data.experience,
        ])
      ),
      totalCourses: data.education.length,
      totalProjects: data.projects.length,
    };
  }

  filterAndExtractData(roadmap: Roadmap) {
    const education = roadmap.education.filter((item) => !!item.startDate);
    const projects = roadmap.projects.filter((item) => !!item.startDate);
    const experience = roadmap.experience.filter((item) => !!item.startDate);

    return [education, experience, projects];
  }

  getStartDate(data: any) {
    const milliseconds = Math.min(
      ...data.map((item: any) => new Date(item.startDate))
    );
    return moment(milliseconds).format("M/D/YYYY");
  }

  getDays(start: any, end: any) {
    const startDate = new Date(start).getTime();
    const endDate = end ? new Date(end).getTime() : new Date().getTime();

    return Math.floor((endDate - startDate) / (1000 * 3600 * 24));
  }

  getTotalTime(date: any) {
    const totalDays = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24)
    );

    const years = Math.floor(totalDays / 365);
    const remainingDays = totalDays % 365;

    return years > 0
      ? `${years} year${years > 1 ? "s" : ""}, ${remainingDays} day${
          remainingDays !== 1 ? "s" : ""
        }`
      : `${remainingDays} day${remainingDays !== 1 ? "s" : ""}`;
  }

  updateRoadmap(data: any) {
    if (data.path && data.stack) {
      this.roadmapStoreService.updateRoadmap({
        path: data.path,
        stack: data.stack,
      });
    }
  }
}

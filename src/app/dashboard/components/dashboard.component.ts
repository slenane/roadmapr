import { Component, OnInit } from "@angular/core";
import { DashboardStoreService } from "../services/dashboard-store.service";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Dashboard } from "../store/dashboard.models";
import { GITHUB_DATA } from "../constants/dashboard.constants";
import * as moment from "moment";
import { ProfileStoreService } from "src/app/profile/services/profile-store.service";
import { Profile } from "src/app/profile/store/profile.models";
import { dashboardInitialState } from "../store/dashboard.reducer";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public user: Profile;
  public dashboard: Dashboard;
  public stack: any = {};
  public stackList: any = [];
  public distribution: any = {};
  public timeline: any = {};
  public overviewData: any = {};
  public radar: any = {};
  public github: any = [];

  constructor(
    private dashboardStoreService: DashboardStoreService,
    private profileStoreService: ProfileStoreService
  ) {}

  ngOnInit(): void {
    this.profileStoreService
      .getProfile()
      .pipe(
        filter((state) => state != null),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((user: Profile) => {
        this.user = user;
      });

    this.dashboardStoreService
      .getDashboard()
      .pipe(
        filter((state) => state != dashboardInitialState),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: (dashboard: Dashboard) => {
          this.dashboard = dashboard;
          const [education, experience, projects] =
            this.filterAndExtractData(dashboard);

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

            this.radar = this.extractStackRadarData({
              personal: [...education, ...projects],
              professional: experience,
            });

            // this.timeline = this.extractTimelineData({
            //   education,
            //   projects,
            //   experience,
            // });

            this.overviewData = this.extractOverviewData({
              education,
              projects,
              experience,
            });
          }

          if (this.dashboard.projects.length) {
            this.github = [...GITHUB_DATA];
          }
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

  filterAndExtractData(dashboard: Dashboard) {
    const education = dashboard.education.filter((item) => !!item.startDate);
    const projects = dashboard.projects.filter((item) => !!item.startDate);
    const experience = dashboard.experience.filter((item) => !!item.startDate);

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
}

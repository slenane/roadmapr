import { Component, OnInit } from "@angular/core";
import { DashboardStoreService } from "../services/dashboard-store.service";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Dashboard } from "../store/dashboard.models";
import { GITHUB_DATA } from "../constants/dashboard.constants";
import * as moment from "moment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public dashboard: any = {};
  public stack: any = {};
  public distribution: any = {};
  public timeline: any = {};
  public radar: any = {};
  public github: any = [];

  constructor(private dashboardStoreService: DashboardStoreService) {}

  ngOnInit(): void {
    this.dashboardStoreService
      .getDashboard()
      .pipe(
        filter((state) => state != null),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((dashboard: Dashboard) => {
        this.dashboard = dashboard;
        const [roadmap, employment, projects] =
          this.filterAndExtractData(dashboard);

        if (roadmap.length || projects.length) {
          this.stack = this.extractStackData({ roadmap, projects });
        }
        if (roadmap.length || projects.length || employment.length) {
          this.distribution = this.extractStackData({
            roadmap,
            projects,
            employment,
          });

          this.radar = this.extractStackRadarData({
            personal: [...roadmap, ...projects],
            professional: employment,
          });

          this.timeline = this.extractTimelineData({
            roadmap,
            projects,
            employment,
          });
        }

        if (this.dashboard.projects.length) {
          this.github = [...GITHUB_DATA];
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
          stack["personal"][language.name] = { duration: 0, language };
        }
        stack["personal"][language.name].duration += this.getDays(
          item.startDate,
          item.endDate
        );
      });
    });

    data.professional.forEach((item: any) => {
      item.stack.forEach((language: any) => {
        if (!stack["professional"][language.name]) {
          stack["professional"][language.name] = { duration: 0, language };
        }
        stack["professional"][language.name].duration += this.getDays(
          item.startDate,
          item.endDate
        );
      });
    });

    return stack;
  }

  extractTimelineData(data: any) {
    const personalStartDate = this.getStartDate([
      ...data.roadmap,
      ...data.projects,
    ]);
    const professionalStartDate = this.getStartDate([...data.employment]);

    const personalTotalTime = this.getTotalTime(personalStartDate);
    const professionalTotalTime = this.getTotalTime(professionalStartDate);

    return {
      personal: {
        startDate: personalStartDate,
        totalTime: personalTotalTime,
      },
      professional: {
        startDate: professionalStartDate,
        totalTime: professionalTotalTime,
      },
    };
  }

  filterAndExtractData(dashboard: Dashboard) {
    const roadmap = [
      ...dashboard.roadmap.books.filter((item) => !!item.startDate),
      ...dashboard.roadmap.courses.filter((item) => !!item.startDate),
      ...dashboard.roadmap.degrees.filter((item) => !!item.startDate),
      ...dashboard.roadmap.tutorials.filter((item) => !!item.startDate),
    ];
    const projects = dashboard.projects.filter((item) => !!item.startDate);
    const employment = dashboard.employment.filter((item) => !!item.startDate);

    return [roadmap, employment, projects];
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
    const months = Math.floor(remainingDays / 30);
    const days = remainingDays % 30;

    return `${years} years, ${months} months, ${days} days`;
  }
}

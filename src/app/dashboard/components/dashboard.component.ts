import { Component, OnInit } from "@angular/core";
import { DashboardStoreService } from "../services/dashboard-store.service";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Dashboard } from "../store/dashboard.models";
import { GITHUB_DATA } from "../constants/dashboard.constants";

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
        this.stack = this.extractStackData({
          roadmap: [
            ...dashboard.roadmap.books,
            ...dashboard.roadmap.courses,
            ...dashboard.roadmap.degrees,
            ...dashboard.roadmap.tutorials,
          ],
          projects: dashboard.projects,
        });
        this.distribution = this.extractStackData({
          roadmap: [
            ...dashboard.roadmap.books,
            ...dashboard.roadmap.courses,
            ...dashboard.roadmap.degrees,
            ...dashboard.roadmap.tutorials,
          ],
          projects: dashboard.projects,
          employment: dashboard.employment,
        });
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
}

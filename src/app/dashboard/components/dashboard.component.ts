import { Component, OnInit } from "@angular/core";
import { DashboardStoreService } from "../services/dashboard-store.service";
import { filter } from "rxjs/operators";
import { Subject } from "rxjs";
import { Dashboard } from "../store/dashboard.models";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public dashboard: any;

  constructor(private dashboardStoreService: DashboardStoreService) {}

  ngOnInit(): void {
    this.dashboardStoreService
      .getDashboard()
      .pipe(filter((state) => state != null))
      .subscribe((dashboard: Dashboard) => {
        this.dashboard = dashboard;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

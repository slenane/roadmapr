import { Component, OnInit } from "@angular/core";
import { DashboardStoreService } from "../services/dashboard-store.service";
import { Store } from "@ngrx/store";
import { Profile } from "src/app/profile/store/profile.models";
import * as profileSelectors from "src/app/profile/store/profile.selectors";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Dashboard } from "../store/dashboard.models";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public userId: any;
  public dashboard: any;

  constructor(
    private dashboardStoreService: DashboardStoreService,
    private store: Store<Profile>
  ) {}

  ngOnInit(): void {
    this.store
      .select(profileSelectors.getProfile)
      .pipe(
        filter((data) => !!data),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((user) => {
        this.userId = user._id;

        if (this.userId) {
          this.dashboardStoreService
            .getDashboard(this.userId)
            .pipe(filter((state) => state != null))
            .subscribe((dashboard: Dashboard) => {
              this.dashboard = dashboard;
            });
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

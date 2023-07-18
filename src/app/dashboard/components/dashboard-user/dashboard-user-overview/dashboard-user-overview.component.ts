import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-dashboard-user-overview",
  templateUrl: "./dashboard-user-overview.component.html",
  styleUrls: ["./dashboard-user-overview.component.scss"],
})
export class DashboardUserOverviewComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}

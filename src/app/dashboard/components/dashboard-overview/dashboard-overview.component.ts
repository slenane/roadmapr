import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-dashboard-overview",
  templateUrl: "./dashboard-overview.component.html",
  styleUrls: ["./dashboard-overview.component.scss"],
})
export class DashboardOverviewComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-dashboard-projects-overview",
  templateUrl: "./dashboard-projects-overview.component.html",
  styleUrls: ["./dashboard-projects-overview.component.scss"],
})
export class DashboardProjectsOverviewComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}

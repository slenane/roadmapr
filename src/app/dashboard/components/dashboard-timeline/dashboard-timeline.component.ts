import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-dashboard-timeline",
  templateUrl: "./dashboard-timeline.component.html",
  styleUrls: ["./dashboard-timeline.component.scss"],
})
export class DashboardTimelineComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}

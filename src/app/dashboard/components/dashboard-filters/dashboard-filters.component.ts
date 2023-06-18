import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard-filters",
  templateUrl: "./dashboard-filters.component.html",
  styleUrls: ["./dashboard-filters.component.scss"],
})
export class DashboardFiltersComponent implements OnInit {
  public selectedType: string = "all";
  public selectedStatus: string = "all";
  public selectedPeriod: string = "all";

  constructor() {}

  ngOnInit(): void {}
}

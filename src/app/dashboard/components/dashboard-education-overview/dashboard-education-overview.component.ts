import {
  Component,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges,
} from "@angular/core";
import Chart from "chart.js/auto";

@Component({
  selector: "app-dashboard-education-overview",
  templateUrl: "./dashboard-education-overview.component.html",
  styleUrls: ["./dashboard-education-overview.component.scss"],
})
export class DashboardEducationOverviewComponent implements OnInit, OnChanges {
  public chart: Chart;

  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.data.currentValue &&
      changes.data.currentValue != changes.data.previousValue
    ) {
      this.generateChartData(changes.data.currentValue);
    }
  }

  generateChartData(data: any): void {
    if (this.chart) this.chart.destroy();

    this.chart = new Chart("educationOverviewChart", {
      type: "line",
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
      },
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Books",
            data: [1, 2, 2, 2, 3, 3, 3],
            // borderColor: "red",
            // backgroundColor: "red",
            tension: 0.5,
          },
          {
            label: "Courses",
            data: [1, 1, 1, 1, 2, 3, 5],
            // borderColor: "blue",
            // backgroundColor: "blue",
            tension: 0.5,
          },
        ],
      },
    });
  }
}

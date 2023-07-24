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
    new Chart("educationOverviewChart", {
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
            borderColor: "red",
            backgroundColor: "red",
            tension: 0.5,
          },
          {
            label: "Courses",
            data: [1, 1, 1, 1, 2, 3, 5],
            borderColor: "blue",
            backgroundColor: "blue",
            tension: 0.5,
          },
          {
            label: "Degrees",
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: "green",
            backgroundColor: "green",
            tension: 0.5,
          },
          {
            label: "Tutorials",
            data: [1, 2, 5, 7, 8, 9, 11],
            borderColor: "#ffcb53",
            backgroundColor: "#ffcb53",
            tension: 0.5,
          },
        ],
      },
    });
  }
}

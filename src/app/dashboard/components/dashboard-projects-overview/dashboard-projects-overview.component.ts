import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-dashboard-projects-overview",
  templateUrl: "./dashboard-projects-overview.component.html",
  styleUrls: ["./dashboard-projects-overview.component.scss"],
})
export class DashboardProjectsOverviewComponent implements OnInit, OnChanges {
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
    data = [{ count: 3 }, { count: 2 }];
    const values = [...data.sort((a: any, b: any) => b.count - a.count)];

    if (values.length) {
      new Chart("projectOverviewChart", {
        type: "doughnut",
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
        data: {
          labels: ["Personal Projects", "Educational Projects"],
          datasets: [
            {
              label: "Projects",
              data: values.map((row: any) => row.count),
            },
          ],
        },
      });
    }
  }
}

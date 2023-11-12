import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import Chart from "chart.js/auto";

@Component({
  selector: "app-roadmap-projects-overview",
  templateUrl: "./roadmap-projects-overview.component.html",
  styleUrls: ["./roadmap-projects-overview.component.scss"],
})
export class RoadmapProjectsOverviewComponent implements OnInit, OnChanges {
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
      if (this.chart) this.chart.destroy();

      const config: any = {
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
      };

      this.chart = new Chart("projectOverviewChart", config);
    }
  }
}

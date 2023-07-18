import {
  Component,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges,
} from "@angular/core";
import Chart from "chart.js/auto";

@Component({
  selector: "app-dashboard-stack",
  templateUrl: "./dashboard-stack.component.html",
  styleUrls: ["./dashboard-stack.component.scss"],
})
export class DashboardStackComponent implements OnInit, OnChanges {
  public stack: any = [];
  public chart: Chart;

  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.data.currentValue &&
      changes.data.currentValue != changes.data.previousValue
    ) {
      this.stack = [...Object.values(this.data)];
      this.generateChartData(changes.data.currentValue);
    }
  }

  generateChartData(data: any): void {
    data = [...Object.values(data)];
    const values = [...data.sort((a: any, b: any) => b.count - a.count)];

    if (values.length) {
      new Chart("stackDoughnut", {
        type: "doughnut",
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
        data: {
          labels: values.map((row: any) => row.language.title),
          datasets: [
            {
              label: "Projects & Education",
              data: values.map((row: any) => row.count),
            },
          ],
        },
      });
    }
  }
}

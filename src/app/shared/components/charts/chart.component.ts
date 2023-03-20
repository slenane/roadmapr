import { Component, Input, OnInit } from "@angular/core";
import { Chart } from "chart.js/auto";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  public chart: any;

  @Input() labels: string[];
  @Input() config: any;
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: this.config.type,
      data: {
        labels: this.labels,
        datasets: this.data,
      },
      options: {
        aspectRatio: this.config.aspectRatio,
      },
    });
  }
}

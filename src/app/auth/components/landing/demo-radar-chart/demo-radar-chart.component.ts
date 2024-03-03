import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ChartComponent,
} from "ng-apexcharts";

type ChartOptions = {
  fill: { colors?: string[] };
  theme: { mode: "light" | "dark" | undefined };
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
};

@Component({
  selector: "app-demo-radar-chart",
  templateUrl: "./demo-radar-chart.component.html",
  styleUrls: ["./demo-radar-chart.component.scss"],
})
export class DemoRadarChartComponent implements OnInit {
  public chartValues = [
    [1, 2, 5, 3],
    [7, 2, 1, 1],
    [5, 4, 2, 1],
    [4, 2, 0, 0],
    [2, 4, 2, 1],
  ];
  public chartCount = 0;
  public chartOptions: ChartOptions = {
    fill: {
      colors: ["#00bcd4"],
    },
    theme: {
      mode: "dark",
    },
    series: [
      {
        name: "Languages used",
        data: [5, 4, 2, 1],
      },
    ],
    chart: {
      height: 250,
      type: "radar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["Frontend", "Full-stack", "Backend", "Database"],
    },
  };

  @ViewChild("chart") chart: ChartComponent;

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.updateChartData();
    }, 5000);
  }

  updateChartData(): void {
    this.chartCount++;
    if (this.chartCount >= this.chartValues.length) this.chartCount = 0;

    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: "Languages used",
          data: this.chartValues[this.chartCount],
        },
      ],
    };
  }
}

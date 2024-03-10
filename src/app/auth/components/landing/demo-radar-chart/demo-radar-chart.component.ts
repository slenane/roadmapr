import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ChartComponent,
} from "ng-apexcharts";
import { MEDIA_QUERIES } from "src/app/shared/constants/breakpoints.constants";

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
  public isMobileDevice = false;

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
      height: 300,
      type: "radar",
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["Frontend", "Full-stack", "Backend", "Database"],
    },
  };

  @ViewChild("chart") chart: ChartComponent;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.updateChartData();
    setInterval(() => {}, 4000);

    this.breakpointObserver
      .observe(MEDIA_QUERIES.BREAKPOINTS)
      .subscribe((result) => {
        this.isMobileDevice = result.breakpoints[Breakpoints.XSmall]
          ? true
          : false;

        if (this.isMobileDevice) {
          this.chartOptions = {
            ...this.chartOptions,
            chart: {
              ...this.chartOptions.chart,
              height: 250,
            },
          };
        }

        setInterval(() => {
          this.updateChartData();
        }, 4000);
      });
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

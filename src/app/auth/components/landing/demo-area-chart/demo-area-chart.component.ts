import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexStroke,
} from "ng-apexcharts";

export type ChartOptions = {
  theme: { mode: "dark" };
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
};

@Component({
  selector: "app-demo-area-chart",
  templateUrl: "./demo-area-chart.component.html",
  styleUrls: ["./demo-area-chart.component.scss"],
})
export class DemoAreaChartComponent implements OnInit {
  public chartCourseValues = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4],
    [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5],
    [0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6],
    [0, 1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7],
    [0, 1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7],
    [0, 1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 8],
  ];
  public chartBookValues = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4],
    [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4],
    [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4],
    [0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6],
    [0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6],
    [0, 1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7],
  ];
  public chartCount = 0;
  public chartOptions: ChartOptions = {
    theme: {
      mode: "dark",
    },
    series: [
      {
        name: "Courses",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: "#00BBD4",
      },
      {
        name: "Books",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: "#00D4A6",
      },
    ],
    chart: {
      height: 250,
      type: "area",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        formatter: function (val: any) {
          return (+val).toFixed(0).toString();
        },
      },
    },
  };

  @ViewChild("chart") chart: ChartComponent;

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.updateChartData();
    }, 3000);
  }

  updateChartData() {
    this.chartCount++;
    if (this.chartCount >= this.chartCourseValues.length) this.chartCount = 0;

    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: "Courses",
          data: this.chartCourseValues[this.chartCount],
          color: "#00BBD4",
        },
        {
          name: "Books",
          data: this.chartBookValues[this.chartCount],
          color: "#00D4A6",
        },
      ],
    };
  }
}

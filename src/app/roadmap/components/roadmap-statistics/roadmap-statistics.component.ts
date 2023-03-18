import { Component, Input, OnInit } from "@angular/core";
import { CHART_COLORS } from "src/app/shared/constants/chart.constants";
import { MONTH_NAMES } from "../../constants/roadmap.constants";

@Component({
  selector: "app-roadmap-statistics",
  templateUrl: "./roadmap-statistics.component.html",
  styleUrls: ["./roadmap-statistics.component.scss"],
})
export class RoadmapStatisticsComponent implements OnInit {
  public labels = MONTH_NAMES;
  public config = {
    type: "line",
    aspectRatio: "1.5",
  };
  public lineChartData: any[] = [];

  @Input() data: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
    this.generateLineChartData(this.data);
  }

  generateLineChartData(data: any): void {
    let count = 0;
    for (const type in data) {
      this.lineChartData.push({
        label: type.charAt(0).toUpperCase() + type.slice(1),
        data: this.generateDataPoints(data[type]),
        borderColor: CHART_COLORS[count],
        tension: 0.1,
      });
      count++;
    }
  }

  generateDataPoints(list: any): any[] {
    const dataPoints: any = [
      ...this.labels.map(() => {
        return {
          value: 0,
        };
      }),
    ];

    list.forEach((item: any) => {
      if (new Date(item.startDate).getFullYear() === new Date().getFullYear()) {
        for (
          let i = new Date(item.startDate).getMonth();
          i < dataPoints.length;
          i++
        ) {
          dataPoints[i].value++;
        }
      } else if (
        new Date(item.endDate).getFullYear() === new Date().getFullYear()
      ) {
        for (
          let i = new Date(item.endDate).getMonth();
          i < dataPoints.length;
          i++
        ) {
          dataPoints[i].value++;
        }
      }
    });

    console.log(dataPoints);
    return dataPoints.map((point: any) => point.value);
  }
}

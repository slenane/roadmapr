import { Component, Input, OnInit } from "@angular/core";
import { CHART_COLORS } from "src/app/shared/constants/chart.constants";
import { MONTH_NAMES } from "../../constants/roadmap.constants";

@Component({
  selector: "app-roadmap-statistics",
  templateUrl: "./roadmap-statistics.component.html",
  styleUrls: ["./roadmap-statistics.component.scss"],
})
export class RoadmapStatisticsComponent implements OnInit {
  public labels = MONTH_NAMES.splice(0, new Date().getMonth() + 1);
  public config = {
    type: "line",
    aspectRatio: "1.5",
  };
  public lineChartData: any[] = [];

  @Input() data: any;

  constructor() {}

  ngOnInit(): void {
    this.generateLineChartData(this.data);
  }

  generateLineChartData(data: any): void {
    let count = 0;
    for (const type in data) {
      this.lineChartData.push({
        label: type.charAt(0).toUpperCase() + type.slice(1),
        data: this.generateDataPoints(data[type]),
        backgroundColor: CHART_COLORS[count],
        borderColor: CHART_COLORS[count++],
        tension: 0.1,
      });
    }
  }

  generateDataPoints(list: any): any[] {
    const month = new Date().getMonth();
    const dataPoints: any = [];
    for (let i = 0; i < month; i++) dataPoints.push(0);

    list.forEach((item: any) => {
      if (new Date(item.startDate).getFullYear() === new Date().getFullYear()) {
        for (
          let i = new Date(item.startDate).getMonth();
          i < dataPoints.length;
          i++
        ) {
          dataPoints[i]++;
        }
      } else if (
        new Date(item.endDate).getFullYear() === new Date().getFullYear()
      ) {
        for (
          let i = new Date(item.endDate).getMonth();
          i < dataPoints.length;
          i++
        ) {
          dataPoints[i]++;
        }
      }
    });

    return dataPoints;
  }
}

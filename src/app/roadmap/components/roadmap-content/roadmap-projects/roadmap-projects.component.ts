import {
  Component,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ProjectItem } from "src/app/projects/store/projects.models";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ChartComponent,
} from "ng-apexcharts";

type ChartOptions = {
  fill: { colors: string[] };
  theme: { mode: "dark" };
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
};

@Component({
  selector: "app-roadmap-projects",
  templateUrl: "./roadmap-projects.component.html",
  styleUrls: ["./roadmap-projects.component.scss"],
})
export class RoadmapProjectsComponent implements OnInit, OnChanges {
  public personal: number = 0;
  public educational: number = 0;
  public personalTrend: number = 0;
  public educationalTrend: number = 0;
  public inProgress: number = 0;
  public completed: number = 0;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: ChartOptions;

  @Input() data: ProjectItem[];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.data &&
      changes.data.currentValue != changes.data.previousValue
    ) {
      this.generateData();
      this.generateChartData();
    }
  }

  generateData() {
    this.data.forEach((item: ProjectItem) => {
      if (item.type === "personal") this.personal += 1;
      else this.educational += 1;

      if (item.endDate) {
        this.completed += 1;
        if (this.isInCurrentMonth(item.endDate)) {
          if (item.type === "personal") this.personalTrend += 1;
          else this.educationalTrend += 1;
        }
      } else this.inProgress += 1;
    });
  }

  generateChartData(): void {
    const labels = ["Frontend", "Full-stack", "Backend", "Database"];
    let full = 0,
      front = 0,
      back = 0,
      db = 0;

    const list = [
      ...this.data.map((item: ProjectItem) => {
        return item.stack.map((stackItem) => stackItem.type);
      }),
    ].flat(Infinity);

    for (const item of list) {
      if (item === "full-stack") full++;
      else if (item === "frontend") front++;
      else if (item === "backend") back++;
      else if (item === "database") db++;
    }

    this.chartOptions = {
      fill: {
        colors: ["#00bcd4"],
      },
      theme: {
        mode: "dark",
      },
      series: [
        {
          name: "Languages used",
          data: [front, full, back, db],
        },
      ],
      chart: {
        height: 300,
        type: "radar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: labels,
      },
    };
  }

  isInCurrentMonth(date: Date) {
    const today = new Date();
    const current = new Date(date);
    return (
      current.getMonth() === today.getMonth() &&
      current.getFullYear() === today.getFullYear()
    );
  }
}

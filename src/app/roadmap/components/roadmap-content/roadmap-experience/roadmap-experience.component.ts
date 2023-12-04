import {
  Component,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ExperienceItem } from "src/app/experience/store/experience.models";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
} from "ng-apexcharts";
import { EducationItem } from "src/app/education/store/education.models";
import { RoadmapService } from "src/app/roadmap/services/roadmap.service";

export type ChartOptions = {
  theme: { mode: "dark" };
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: "app-roadmap-experience",
  templateUrl: "./roadmap-experience.component.html",
  styleUrls: ["./roadmap-experience.component.scss"],
})
export class RoadmapExperienceComponent implements OnInit {
  public totalTime: number;
  @Input() experience: ExperienceItem[];
  @Input() education: EducationItem[];

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: ChartOptions;

  constructor(private roadmapService: RoadmapService) {}

  ngOnInit(): void {
    this.generateChart();
    this.getTotalProfessionalTime();
  }

  generateChart() {
    const educationData = this.getEducationData();
    const [freelanceData, professionalData] = this.getExperienceData();

    this.chartOptions = {
      theme: {
        mode: "dark",
      },
      series: [
        {
          data: [
            ...(educationData.length ? educationData : []),
            ...(freelanceData.length ? freelanceData : []),
            ...(professionalData.length ? professionalData : []),
          ],
        },
      ],
      chart: {
        height: 200,
        type: "rangeBar",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return opts.w.globals.labels[opts.dataPointIndex];
        },
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        show: false,
      },
    };
  }

  getEducationData() {
    const items = this.combineDates(
      this.education.filter((item) => !!item.startDate)
    );

    const data: any = [];

    for (let item of items) {
      const startDate = new Date(item.startDate).getTime();
      const endDate = item.endDate
        ? new Date(item.endDate).getTime()
        : new Date().getTime();

      data.push({
        // x: "ROADMAP.EXPERIENCE.EDUCATION",
        x: "Education",
        y: [startDate, endDate],
        fillColor: "#00bcd4",
      });
    }

    return data;
  }

  getExperienceData() {
    const freelance: any = [];
    const professional: any = [];
    for (let item of this.experience) {
      const startDate = new Date(item.startDate).getTime();
      const endDate = item.endDate
        ? new Date(item.endDate).getTime()
        : new Date().getTime();

      if (item.type === "freelance") {
        freelance.push({
          // x: "ROADMAP.EXPERIENCE.FREELANCE",
          x: "Freelance",
          y: [startDate, endDate],
          fillColor: "#00bcd4",
        });
      } else {
        professional.push({
          // x: "ROADMAP.EXPERIENCE.PROFESSIONAL",
          x: "Experience",
          y: [startDate, endDate],
          fillColor: "#00bcd4",
        });
      }
    }

    return [freelance, professional];
  }

  combineDates(items: any[]): any[] {
    const result: any[] = [];
    let currentRange: any = null;

    items.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    for (const item of items) {
      const startDate = new Date(item.startDate);
      const endDate = item.endDate ? new Date(item.endDate) : new Date();

      if (!currentRange) {
        currentRange = { startDate, endDate };
      } else if (startDate <= currentRange.endDate) {
        currentRange.startDate =
          startDate < currentRange.startDate
            ? startDate
            : currentRange.startDate;
        currentRange.endDate =
          endDate > currentRange.endDate ? endDate : currentRange.endDate;
      } else {
        result.push({
          startDate: currentRange.startDate,
          endDate: currentRange.endDate,
        });
        currentRange = { startDate, endDate };
      }
    }

    if (currentRange) {
      result.push({
        startDate: currentRange.startDate,
        endDate: currentRange.endDate,
      });
    }

    return result;
  }

  getTotalProfessionalTime() {
    this.totalTime = this.roadmapService.getPercentageOfTotalTime(
      [...this.education, ...this.experience],
      this.experience
    );
  }
}

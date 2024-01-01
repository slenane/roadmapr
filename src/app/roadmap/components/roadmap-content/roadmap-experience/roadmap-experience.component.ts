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
  ApexFill,
} from "ng-apexcharts";
import { EducationItem } from "src/app/education/store/education.models";
import { RoadmapService } from "src/app/roadmap/services/roadmap.service";
import { TranslateService } from "@ngx-translate/core";

export type ChartOptions = {
  theme: { mode: "dark" };
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: "app-roadmap-experience",
  templateUrl: "./roadmap-experience.component.html",
  styleUrls: ["./roadmap-experience.component.scss"],
})
export class RoadmapExperienceComponent implements OnInit {
  public freelanceCount: number;
  public professionalCount: number;
  public freelanceTotalTime: { years: number; days: number };
  public professionalTotalTime: { years: number; days: number };
  public totalTime: number | "N/A";

  @Input() experience: ExperienceItem[];
  @Input() education: EducationItem[];

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: ChartOptions;

  constructor(
    private roadmapService: RoadmapService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes.experience &&
        changes.experience.currentValue != changes.experience.previousValue) ||
      (changes.education &&
        changes.education.currentValue != changes.education.previousValue)
    ) {
      this.setInitialValues();
      this.generateChart();
      this.getTotalProfessionalTime();
    }
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
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          const dataPointIndex = opts.dataPointIndex;
          return opts.config.series[0].data?.[dataPointIndex].x || "";
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
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

    let educationLabel = "Education";
    this.translate
      .get("ROADMAP.EXPERIENCE.EDUCATION")
      .subscribe((data: any) => {
        educationLabel = data;
      });

    const data: any = [];

    for (let item of items) {
      const startDate = new Date(item.startDate).getTime();
      const endDate = item.endDate
        ? new Date(item.endDate).getTime()
        : new Date().getTime();

      data.push({
        x: educationLabel,
        y: [startDate, endDate],
        fillColor: "#00bcd4",
      });
    }

    return data;
  }

  getExperienceData() {
    const freelance: any = [];
    const professional: any = [];
    let freelanceLabel = "Freelance",
      professionalLabel = "Professional";

    this.translate
      .get("ROADMAP.EXPERIENCE.FREELANCE")
      .subscribe((data: any) => {
        freelanceLabel = data;
      });
    this.translate
      .get("ROADMAP.EXPERIENCE.PROFESSIONAL")
      .subscribe((data: any) => {
        professionalLabel = data;
      });

    for (let item of this.experience) {
      const startDate = new Date(item.startDate).getTime();
      const endDate = item.endDate
        ? new Date(item.endDate).getTime()
        : new Date().getTime();

      if (item.type === "freelance") {
        freelance.push({
          x: freelanceLabel,
          y: [startDate, endDate],
          fillColor: "#00D4A6",
        });

        this.freelanceCount++;
      } else {
        professional.push({
          x: professionalLabel,
          y: [startDate, endDate],
          fillColor: "#00D4A6",
        });

        this.professionalCount++;
      }
    }

    this.freelanceTotalTime = this.roadmapService.getCombinedTime(
      freelance.map((item: any) => item.y)
    );
    this.professionalTotalTime = this.roadmapService.getCombinedTime(
      professional.map((item: any) => item.y)
    );

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

  setInitialValues() {
    this.freelanceCount = 0;
    this.professionalCount = 0;
    this.freelanceTotalTime = { years: 0, days: 0 };
    this.professionalTotalTime = { years: 0, days: 0 };
    this.totalTime = 0;
  }
}

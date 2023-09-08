import {
  Component,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges,
} from "@angular/core";
import Chart from "chart.js/auto";

@Component({
  selector: "app-dashboard-stack-radar",
  templateUrl: "./dashboard-stack-radar.component.html",
  styleUrls: ["./dashboard-stack-radar.component.scss"],
})
export class DashboardStackRadarComponent implements OnInit, OnChanges {
  public stack: any = {};
  public chart: Chart;

  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.data.currentValue &&
      changes.data.currentValue != changes.data.previousValue
    ) {
      this.generateChartData(changes.data.currentValue);
    }
  }

  generateChartData(data: any): void {
    if (data?.personal || data?.professional) {
      const personal = [
        ...(Object.keys(data?.personal) ? Object.values(data?.personal) : []),
      ];
      const professional = [
        ...(Object.keys(data?.professional)
          ? Object.values(data?.professional)
          : []),
      ];
      const labels = Array.from(
        new Set([
          ...personal.map((row: any) => row.language.title),
          ...professional.map((row: any) => row.language.title),
        ])
      ).sort((a: any, b: any) => a.localeCompare(b));

      let personalData = [],
        professionalData = [];

      for (const label of labels) {
        const personalItem: any = personal.find(
          (item: any) => item.language.title === label
        );
        const professionalItem: any = professional.find(
          (item: any) => item.language.title === label
        );
        personalData.push(personalItem?.count || 0);
        professionalData.push(professionalItem?.count || 0);
      }

      if (personal.length || professional.length) {
        if (this.chart) this.chart.destroy();

        this.chart = new Chart("stackRadar", {
          type: "radar",
          options: {
            plugins: {
              legend: { display: false },
            },
          },
          data: {
            labels: labels,
            datasets: [
              {
                label: "Personal Experience",
                data: personalData,
              },
              {
                label: "Professional Experience",
                data: professionalData,
              },
            ],
          },
        });
      }
    }
  }
}

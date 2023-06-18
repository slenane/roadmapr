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
    const personal = [...Object.values(data.personal)];
    const professional = [...Object.values(data.professional)];
    const labels = Array.from(
      new Set([
        ...personal.map((row: any) => row.language.title),
        ...professional.map((row: any) => row.language.title),
      ])
    );

    let personalData = [],
      professionalData = [];

    for (const label of labels) {
      const personalItem: any = personal.find(
        (item: any) => item.language.title === label
      );
      const professionalItem: any = professional.find(
        (item: any) => item.language.title === label
      );
      personalData.push(personalItem?.duration || 0);
      professionalData.push(professionalItem?.duration || 0);
    }

    if (personal.length || professional.length) {
      new Chart("stackRadar", {
        type: "radar",
        options: {},
        data: {
          labels: labels,
          datasets: [
            {
              label: "Personal Days",
              data: personalData,
            },
            {
              label: "Professional",
              data: professionalData,
            },
          ],
        },
      });
    }
  }
}

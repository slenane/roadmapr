import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { DEVELOPER_TYPE_DESCRIPTIONS } from "../../constants/distribution.constants";

@Component({
  selector: "app-dashboard-distribution-slider",
  templateUrl: "./dashboard-distribution-slider.component.html",
  styleUrls: ["./dashboard-distribution-slider.component.scss"],
})
export class DashboardDistributionSliderComponent implements OnInit {
  percentage: number = 50;
  description: string = "";

  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.data.currentValue &&
      changes.data.currentValue != changes.data.previousValue
    ) {
      if (Object.keys(changes.data.currentValue).length) {
        this.generatePercentage(changes.data.currentValue);
      }
    }
  }

  generatePercentage(data: any) {
    let total = 0;
    const distribution = {
      frontend: 0,
      backend: 0,
      database: 0,
      "full-stack": 0,
    };
    for (const item in data) {
      const type: "frontend" | "backend" | "full-stack" | "database" =
        data[item].language.type;
      distribution[type] += data[item].count;
      total += data[item].count;
    }

    const front = distribution["frontend"];

    this.percentage = (front / total) * 100;
    this.updateDevDescription(this.percentage);
  }

  updateDevDescription(percentage: number) {
    if (percentage < 20) {
      this.description = DEVELOPER_TYPE_DESCRIPTIONS.BACK;
    } else if (percentage < 40) {
      this.description = DEVELOPER_TYPE_DESCRIPTIONS.BACK_TO_FULL;
    } else if (percentage < 60) {
      this.description = DEVELOPER_TYPE_DESCRIPTIONS.FULL;
    } else if (percentage < 80) {
      this.description = DEVELOPER_TYPE_DESCRIPTIONS.FULL_TO_FRONT;
    } else {
      this.description = DEVELOPER_TYPE_DESCRIPTIONS.FRONT;
    }
  }
}

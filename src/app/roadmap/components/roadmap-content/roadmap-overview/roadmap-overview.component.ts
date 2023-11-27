import {
  Component,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges,
} from "@angular/core";
import { Roadmap } from "src/app/roadmap/store/roadmap.models";

@Component({
  selector: "app-roadmap-overview",
  templateUrl: "./roadmap-overview.component.html",
  styleUrls: ["./roadmap-overview.component.scss"],
})
export class RoadmapOverviewComponent implements OnInit, OnChanges {
  public education: number = 0;
  public projects: number = 0;
  public experience: number = 0;
  public languages: number = 0;
  public time: { years: number; days: number };

  @Input() data: Roadmap;
  @Input() stackList: any[];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.data &&
      changes.data.currentValue != changes.data.previousValue
    ) {
      this.generateData();
    }
  }

  generateData() {
    this.education = this.data.education.length;
    this.projects = this.data.projects.length;
    this.experience = this.data.experience.length;
    this.languages = Object.keys(this.stackList).length;
    this.time = this.getTotalTime(
      this.getStartDate([
        ...this.data.education,
        ...this.data.projects,
        ...this.data.experience,
      ])
    );
  }

  getStartDate(data: any): number {
    const dates = data
      .filter((item: any) => !!item.startDate)
      .map((item: any) => new Date(item.startDate).getTime());

    return Math.min(...dates);
  }

  getTotalTime(date: number): { years: number; days: number } {
    const totalDays = Math.floor(
      (new Date().getTime() - date) / (1000 * 3600 * 24)
    );

    const years = Math.floor(totalDays / 365) || 0;
    const remainingDays = totalDays % 365 || 0;

    return { years: years, days: remainingDays };
  }
}

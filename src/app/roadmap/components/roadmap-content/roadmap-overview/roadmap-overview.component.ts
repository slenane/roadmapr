import {
  Component,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges,
} from "@angular/core";
import { Profile } from "src/app/profile/store/profile.models";
import { RoadmapService } from "src/app/roadmap/services/roadmap.service";
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
  @Input() user: Profile;
  @Input() stackList: any[];

  constructor(private roadmapService: RoadmapService) {}

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
    this.time = this.roadmapService.getTotalTime(
      this.roadmapService.getStartDate([
        ...this.data.education,
        ...this.data.projects,
        ...this.data.experience,
      ])
    );
  }
}

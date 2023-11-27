import {
  Component,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges,
} from "@angular/core";
import { ProjectItem } from "src/app/projects/store/projects.models";

@Component({
  selector: "app-roadmap-projects",
  templateUrl: "./roadmap-projects.component.html",
  styleUrls: ["./roadmap-projects.component.scss"],
})
export class RoadmapProjectsComponent implements OnInit, OnChanges {
  public personal: number = 0;
  public educational: number = 0;
  public inProgress: number = 0;
  public completed: number = 0;

  @Input() data: ProjectItem[];

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
    this.data.forEach((item: ProjectItem) => {
      if (item.type === "personal") this.personal += 1;
      else this.educational += 1;

      if (item.endDate) this.completed += 1;
      else this.inProgress += 1;
    });
  }
}

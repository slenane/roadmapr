import {
  Component,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges,
} from "@angular/core";
import { EducationItem } from "src/app/education/store/education.models";
import { IStack } from "src/app/shared/constants/dev-paths.constants";

@Component({
  selector: "app-roadmap-education",
  templateUrl: "./roadmap-education.component.html",
  styleUrls: ["./roadmap-education.component.scss"],
})
export class RoadmapEducationComponent implements OnInit, OnChanges {
  public books: number = 0;
  public courses: number = 0;
  public inProgress: number = 0;
  public completed: number = 0;
  public completionRate: number;
  public stackCoverage: number;

  @Input() data: EducationItem[];
  @Input() userStack: IStack | undefined;
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
    if (
      (changes.userStack &&
        changes.userStack.currentValue != changes.userStack.previousValue) ||
      (changes.userStack &&
        changes.userStack.currentValue != changes.userStack.previousValue)
    ) {
      this.getStackCoverage();
    }
  }

  generateData() {
    this.data.forEach((item: EducationItem) => {
      if (item.type === "book") this.books += 1;
      else this.courses += 1;

      if (item.endDate) this.completed += 1;
      else this.inProgress += 1;
    });

    this.completionRate =
      this.inProgress + this.completed !== 0
        ? Math.ceil((100 * this.completed) / (this.inProgress + this.completed))
        : 0;
  }

  getStackCoverage() {
    const completeStack = [...(this.userStack?.stack.core || [])];
    let count = 0;

    for (let stack in this.stackList) {
      if (completeStack.find((item) => item.name === stack)) count += 1;
    }

    this.stackCoverage =
      count + completeStack.length !== 0
        ? Math.ceil((count / completeStack.length) * 100)
        : 0;
  }
}

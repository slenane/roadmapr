import {
  Component,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges,
} from "@angular/core";
import Chart from "chart.js/auto";

@Component({
  selector: "app-roadmap-stack",
  templateUrl: "./roadmap-stack.component.html",
  styleUrls: ["./roadmap-stack.component.scss"],
})
export class RoadmapStackComponent implements OnInit, OnChanges {
  public stack: any = [];

  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.data.currentValue &&
      changes.data.currentValue != changes.data.previousValue
    ) {
      // const values = [...data.sort((a: any, b: any) => b.count - a.count)];
      this.stack = [...Object.values(this.data)].sort(
        (a: any, b: any) => b.count - a.count
      );
    }
  }
}

import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-roadmap-github",
  templateUrl: "./roadmap-github.component.html",
  styleUrls: ["./roadmap-github.component.scss"],
})
export class RoadmapGithubComponent implements OnInit, OnChanges {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.data.currentValue &&
      changes.data.currentValue != changes.data.previousValue
    ) {
    }
  }
}

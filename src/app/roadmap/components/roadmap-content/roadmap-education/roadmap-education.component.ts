import {
  Component,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-roadmap-education",
  templateUrl: "./roadmap-education.component.html",
  styleUrls: ["./roadmap-education.component.scss"],
})
export class RoadmapEducationComponent implements OnInit, OnChanges {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {}
}

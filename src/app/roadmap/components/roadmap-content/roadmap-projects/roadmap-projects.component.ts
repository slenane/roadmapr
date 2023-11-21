import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from "@angular/core";

@Component({
  selector: "app-roadmap-projects",
  templateUrl: "./roadmap-projects.component.html",
  styleUrls: ["./roadmap-projects.component.scss"],
})
export class RoadmapProjectsComponent implements OnInit, OnChanges {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {}
}

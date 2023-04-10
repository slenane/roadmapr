import { Component, OnInit, Input } from "@angular/core";
import { Roadmap } from "src/app/roadmap/store/roadmap.models";

@Component({
  selector: "app-profile-overview",
  templateUrl: "./profile-overview.component.html",
  styleUrls: ["./profile-overview.component.scss"],
})
export class ProfileOverviewComponent implements OnInit {
  @Input() roadmap: Roadmap;

  constructor() {}

  ngOnInit(): void {}
}

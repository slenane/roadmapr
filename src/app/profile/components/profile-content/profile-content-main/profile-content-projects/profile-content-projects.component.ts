import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-content-projects",
  templateUrl: "./profile-content-projects.component.html",
  styleUrls: ["./profile-content-projects.component.scss"],
})
export class ProfileContentProjectsComponent implements OnInit {
  @Input() project: any;

  constructor() {}

  ngOnInit(): void {}
}

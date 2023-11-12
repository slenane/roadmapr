import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-content-experience",
  templateUrl: "./profile-content-experience.component.html",
  styleUrls: ["./profile-content-experience.component.scss"],
})
export class ProfileContentExperienceComponent implements OnInit {
  @Input() experience: any;

  constructor() {}

  ngOnInit(): void {}
}

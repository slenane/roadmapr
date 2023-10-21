import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-content-education",
  templateUrl: "./profile-content-education.component.html",
  styleUrls: ["./profile-content-education.component.scss"],
})
export class ProfileContentEducationComponent implements OnInit {
  @Input() education: any;

  constructor() {}

  ngOnInit(): void {}
}

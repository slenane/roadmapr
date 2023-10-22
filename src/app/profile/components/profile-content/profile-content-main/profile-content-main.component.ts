import { Component, OnInit, Input } from "@angular/core";
import { Profile } from "src/app/profile/store/profile.models";

@Component({
  selector: "app-profile-content-main",
  templateUrl: "./profile-content-main.component.html",
  styleUrls: ["./profile-content-main.component.scss"],
})
export class ProfileContentMainComponent implements OnInit {
  @Input() user: Profile;

  constructor() {}

  ngOnInit(): void {}
}

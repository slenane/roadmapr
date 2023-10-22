import { Component, OnInit, Input } from "@angular/core";
import { Profile } from "src/app/profile/store/profile.models";
@Component({
  selector: "app-profile-content-personal",
  templateUrl: "./profile-content-personal.component.html",
  styleUrls: ["./profile-content-personal.component.scss"],
})
export class ProfileContentPersonalComponent implements OnInit {
  @Input() user: Profile;

  constructor() {}

  ngOnInit(): void {}
}

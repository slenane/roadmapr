import { Component, OnInit, Input } from "@angular/core";
import { Profile } from "src/app/profile/store/profile.models";
@Component({
  selector: "app-profile-edit-layout",
  templateUrl: "./profile-edit-layout.component.html",
  styleUrls: ["./profile-edit-layout.component.scss"],
})
export class ProfileEditLayoutComponent implements OnInit {
  @Input() user: Profile;

  constructor() {}

  ngOnInit(): void {}
}

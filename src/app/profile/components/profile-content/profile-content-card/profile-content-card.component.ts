import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Profile } from "src/app/profile/store/profile.models";

@Component({
  selector: "app-profile-content-card",
  templateUrl: "./profile-content-card.component.html",
  styleUrls: ["./profile-content-card.component.scss"],
})
export class ProfileContentCardComponent implements OnInit {
  @Input() user: Profile;
  @Output() editProfile: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log(this.user);
  }
}

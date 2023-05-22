import { Component, EventEmitter, OnInit, Input, Output } from "@angular/core";
import { Profile } from "../../store/profile.models";

@Component({
  selector: "app-profile-info",
  templateUrl: "./profile-info.component.html",
  styleUrls: ["./profile-info.component.scss"],
})
export class ProfileInfoComponent implements OnInit {
  @Input() user: Profile;
  @Output() editProfile: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}

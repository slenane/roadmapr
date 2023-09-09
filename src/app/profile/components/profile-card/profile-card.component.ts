import { Component, OnInit, Input } from "@angular/core";
import { Profile } from "../../store/profile.models";

@Component({
  selector: "app-profile-card",
  templateUrl: "./profile-card.component.html",
  styleUrls: ["./profile-card.component.scss"],
})
export class ProfileCardComponent implements OnInit {
  @Input() user: Profile;

  constructor() {}

  ngOnInit(): void {}
}

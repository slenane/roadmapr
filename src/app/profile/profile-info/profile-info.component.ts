import { Component, OnInit, Input } from "@angular/core";
import { UserDetails } from "src/app/core/store/auth.models";

@Component({
  selector: "app-profile-info",
  templateUrl: "./profile-info.component.html",
  styleUrls: ["./profile-info.component.scss"],
})
export class ProfileInfoComponent implements OnInit {
  @Input() user: UserDetails;

  constructor() {}

  ngOnInit(): void {}
}

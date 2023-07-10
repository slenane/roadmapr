import { Component, OnInit, Input } from "@angular/core";
import { Profile } from "src/app/profile/store/profile.models";

@Component({
  selector: "app-dashboard-user",
  templateUrl: "./dashboard-user.component.html",
  styleUrls: ["./dashboard-user.component.scss"],
})
export class DashboardUserComponent implements OnInit {
  @Input() user: Profile;

  constructor() {}

  ngOnInit(): void {}
}

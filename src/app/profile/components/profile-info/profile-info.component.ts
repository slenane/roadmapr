import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/core/store/auth.models";

@Component({
  selector: "app-profile-info",
  templateUrl: "./profile-info.component.html",
  styleUrls: ["./profile-info.component.scss"],
})
export class ProfileInfoComponent implements OnInit {
  @Input() user: User;

  constructor() {}

  ngOnInit(): void {}
}

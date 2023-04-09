import { Component, OnInit } from "@angular/core";
import { UserDetails } from "../core/store/auth.models";
import { AuthService } from "../core/services//auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  details: UserDetails | null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(
      (user) => {
        this.details = user;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}

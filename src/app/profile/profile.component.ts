import { Component, OnInit } from "@angular/core";
import { UserDetails } from "../core/store/auth.models";
import { AuthService } from "../core/services//auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public user: UserDetails | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => console.error(err),
    });
  }
}

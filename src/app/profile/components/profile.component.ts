import { Component, OnInit } from "@angular/core";
import { User } from "src/app/core/store/auth.models";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public user: User;

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

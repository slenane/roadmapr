import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { ROUTES } from "src/app/core/constants/routes.constants";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  public currentView: string;

  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) this.router.navigate([ROUTES.DASHBOARD]);
    this.updateView(this.location.path());

    this.location.onUrlChange((url, state) => {
      this.updateView(url);
    });
  }

  updateView(path: string) {
    if (path === "/login") this.currentView = "login";
    else if (path === "/register") this.currentView = "register";
    else if (path === "/send-reset-password-email")
      this.currentView = "sendResetPasswordEmail";
    else if (path === "/reset-password") this.currentView = "resetPassword";
  }
}

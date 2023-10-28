import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { AuthService } from "src/app/auth/services/auth.service";
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
    console.log("PING");
    if (this.authService.isLoggedIn()) this.router.navigate([ROUTES.DASHBOARD]);
    this.updateView(this.location.path());

    this.location.onUrlChange((url, state) => {
      this.updateView(url);
    });
  }

  updateView(path: string) {
    if (new RegExp("/register").test(path)) this.currentView = "register";
    else if (new RegExp("/send-reset-password-email").test(path))
      this.currentView = "sendResetPasswordEmail";
    else if (new RegExp("/reset-password").test(path))
      this.currentView = "resetPassword";
    else this.currentView = "login";
  }
}

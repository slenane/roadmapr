import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { ThemeService } from "src/app/core/services/theme.service";
import { AuthService } from "../../services/auth.service";
import { ROUTES } from "src/app/core/constants/routes.constants";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  public theme$: Observable<string>;
  public currentTheme: string;
  public isRegistering: boolean;

  constructor(
    private location: Location,
    private router: Router,
    private themeService: ThemeService,
    private authService: AuthService
  ) {
    this.theme$ = this.themeService.selectedTheme;
  }

  ngOnInit(): void {
    this.theme$.subscribe((theme: string) => {
      this.currentTheme = theme;
    });

    if (this.authService.isLoggedIn()) this.router.navigate([ROUTES.DASHBOARD]);

    this.location.onUrlChange((url, state) => {
      this.isRegistering = url === "/register" ? true : false;
    });
  }
}

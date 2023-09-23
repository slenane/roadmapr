import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { ThemeService } from "src/app/core/services/theme.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  public theme$: Observable<string>;
  public currentTheme: string;
  public isRegistering: boolean;
  public isRedirecting: boolean;

  constructor(private location: Location, private themeService: ThemeService) {
    this.theme$ = this.themeService.selectedTheme;
  }

  ngOnInit(): void {
    this.theme$.subscribe((theme: string) => {
      this.currentTheme = theme;
    });
    this.isRedirecting = this.location.path().includes("/redirect")
      ? true
      : false;
    this.isRegistering = this.location.path() === "/register" ? true : false;
  }
}

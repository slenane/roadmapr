import { Component, HostListener, OnInit } from "@angular/core";
import { AuthService } from "./core/services//auth.service";
import { Observable } from "rxjs";
import { ThemeService } from "./core/services/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public authenticated$: Observable<boolean>;
  public theme$: Observable<string>;
  public currentTheme: string;
  public navbarCollapsed: boolean = true;

  constructor(
    public authService: AuthService,
    private themeService: ThemeService
  ) {
    this.authenticated$ = this.authService.isAuthenticated;
    this.theme$ = this.themeService.selectedTheme;
  }

  ngOnInit(): void {
    this.theme$.subscribe((theme: string) => {
      this.currentTheme = theme;
    });

    const theme = window.localStorage.getItem("selectedTheme");
    if (theme) {
      this.themeService.updateTheme(theme);
    }
  }

  collapseNavbar(value: any) {
    this.navbarCollapsed = value;
  }

  @HostListener("window:unload", ["$event"])
  unloadHandler(event: Event) {
    if (this.currentTheme) {
      window.localStorage.setItem("selectedTheme", this.currentTheme);
    }
  }
}

import { Component, HostListener, OnInit } from "@angular/core";
import { AuthService } from "./auth/services/auth.service";
import { Observable } from "rxjs";
import { ThemeService } from "./core/services/theme.service";
import { Location } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public authenticated$: Observable<boolean>;
  public theme$: Observable<string>;
  public isRedirecting: boolean;
  public currentTheme: string;
  public navbarCollapsed: boolean = true;

  constructor(
    public authService: AuthService,
    private themeService: ThemeService,
    private location: Location,
    private translateService: TranslateService
  ) {
    this.authenticated$ = this.authService.isAuthenticated;
    this.theme$ = this.themeService.selectedTheme;
  }

  ngOnInit(): void {
    this.isRedirecting = this.location.path() === "/redirect" ? true : false;
    this.theme$.subscribe((theme: string) => (this.currentTheme = theme));

    const theme = window.localStorage.getItem("selected-theme");
    if (theme) this.themeService.updateTheme(theme);
    const preferredLanguage = window.localStorage.getItem("preferred-language");
    if (preferredLanguage) this.translateService.use(preferredLanguage);
  }

  collapseNavbar(value: any) {
    this.navbarCollapsed = value;
  }

  @HostListener("window:unload", ["$event"])
  unloadHandler(event: Event) {
    if (this.currentTheme) {
      window.localStorage.setItem("selected-theme", this.currentTheme);
    }

    if (this.translateService.currentLang) {
      window.localStorage.setItem(
        "preferred-language",
        this.translateService.currentLang
      );
    }
  }
}

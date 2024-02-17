import { Component, HostListener, OnInit } from "@angular/core";
import { AuthService } from "./auth/services/auth.service";
import { Observable } from "rxjs";
import { ThemeService } from "./core/services/theme.service";
import { Location } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { NgcCookieConsentService } from "ngx-cookieconsent";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public authenticated$: Observable<boolean>;
  public theme$: Observable<"light" | "dark" | undefined>;
  public isRedirecting: boolean;
  public currentTheme: "light" | "dark" | undefined;
  public isAuthenticated: boolean;
  public navbarCollapsed: boolean = true;

  constructor(
    public authService: AuthService,
    private themeService: ThemeService,
    private location: Location,
    private translateService: TranslateService,
    private cookieService: NgcCookieConsentService
  ) {
    this.authenticated$ = this.authService.isAuthenticated;
    this.theme$ = this.themeService.selectedTheme;
  }

  ngOnInit(): void {
    this.isRedirecting = this.location.path() === "/redirect" ? true : false;
    this.theme$.subscribe(
      (theme: "light" | "dark" | undefined) => (this.currentTheme = theme)
    );
    this.authenticated$.subscribe((authenticated: boolean) => {
      this.isAuthenticated = authenticated;
    });

    const theme = localStorage.getItem("selected-theme");
    if (theme) this.themeService.updateTheme(theme);
    const preferredLanguage = localStorage.getItem("preferred-language");
    preferredLanguage
      ? this.translateService.use(preferredLanguage)
      : this.translateService.use("en");

    // COOKIE CONSENT
    this.translateService
      .get([
        "PRIVACY_POLICY.COOKIE_CONSENT.MESSAGE",
        "PRIVACY_POLICY.COOKIE_CONSENT.ACCEPT",
        "PRIVACY_POLICY.COOKIE_CONSENT.LEARN_MORE",
        "PRIVACY_POLICY.COOKIE_CONSENT.PRIVACY_POLICY",
      ])
      .subscribe((data) => {
        const config = this.cookieService.getConfig();
        if (config) {
          // Ensure getConfig().content is defined
          config.content = config.content || {};

          // Assign translated values to config.content properties
          config.content.message =
            data["PRIVACY_POLICY.COOKIE_CONSENT.MESSAGE"];
          config.content.dismiss = data["PRIVACY_POLICY.COOKIE_CONSENT.ACCEPT"];
          config.content.link =
            data["PRIVACY_POLICY.COOKIE_CONSENT.LEARN_MORE"];
          config.content.policy =
            data["PRIVACY_POLICY.COOKIE_CONSENT.PRIVACY_POLICY"];

          // Destroy previous cookie bar (with default messages)
          this.cookieService.destroy?.();

          // Update config with translated messages
          this.cookieService.init?.(config);
        }
      });
  }

  collapseNavbar(value: any) {
    this.navbarCollapsed = value;
  }

  @HostListener("window:unload", ["$event"])
  unloadHandler(event: Event) {
    if (this.isAuthenticated) {
      if (this.currentTheme) {
        localStorage.setItem("selected-theme", this.currentTheme);
      }

      if (this.translateService.currentLang) {
        localStorage.setItem(
          "preferred-language",
          this.translateService.currentLang
        );
      }
    }
  }
}

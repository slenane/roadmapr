import { Component, HostListener, OnInit } from "@angular/core";
import { AuthService } from "./auth/services/auth.service";
import { Observable, Subscription } from "rxjs";
import { ThemeService } from "./core/services/theme.service";
import { Location } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import {
  NgcCookieConsentService,
  NgcInitializationErrorEvent,
  NgcInitializingEvent,
  NgcNoCookieLawEvent,
  NgcStatusChangeEvent,
} from "ngx-cookieconsent";

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

  // COOKIE CONSENT
  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;

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
      if (authenticated) this.cookieService.destroy();
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

    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.cookieService.popupOpen$.subscribe(() => {
      // you can use this.cookieService.getConfig() to do stuff...
    });

    this.popupCloseSubscription = this.cookieService.popupClose$.subscribe(
      () => {
        // you can use this.cookieService.getConfig() to do stuff...
      }
    );

    this.initializingSubscription = this.cookieService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
        console.log(`initializing: ${JSON.stringify(event)}`);
      }
    );

    this.initializedSubscription = this.cookieService.initialized$.subscribe(
      () => {
        // the cookieconsent has been successfully initialized.
        // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
        console.log(`initialized: ${JSON.stringify(event)}`);
      }
    );

    this.initializationErrorSubscription =
      this.cookieService.initializationError$.subscribe(
        (event: NgcInitializationErrorEvent) => {
          // the cookieconsent has failed to initialize...
          console.log(
            `initializationError: ${JSON.stringify(event.error?.message)}`
          );
        }
      );

    this.statusChangeSubscription = this.cookieService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.cookieService.getConfig() to do stuff...
      }
    );

    this.revokeChoiceSubscription = this.cookieService.revokeChoice$.subscribe(
      () => {
        // you can use this.cookieService.getConfig() to do stuff...
      }
    );

    this.noCookieLawSubscription = this.cookieService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.cookieService.getConfig() to do stuff...
      }
    );
  }

  collapseNavbar(value: any) {
    this.navbarCollapsed = value;
  }

  ngOnDestroy() {
    // COOKIE CONSENT
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
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

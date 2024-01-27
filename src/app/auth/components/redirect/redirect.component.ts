import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthStoreService } from "../../services/auth-store.service";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";
import { ThemeService } from "src/app/core/services/theme.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-redirect",
  templateUrl: "./redirect.component.html",
  styleUrls: ["./redirect.component.scss"],
})
export class RedirectComponent implements OnInit {
  public theme$: Observable<"light" | "dark" | undefined>;
  public currentTheme: "light" | "dark" | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private authStoreService: AuthStoreService,
    private themeService: ThemeService,
    private translateService: TranslateService
  ) {
    this.theme$ = this.themeService.selectedTheme;
  }

  ngOnInit() {
    this.theme$.subscribe((theme: "light" | "dark" | undefined) => {
      this.currentTheme = theme;
    });

    const browserLanguage = navigator.language.split("-")[0];
    const language =
      browserLanguage === "es" || browserLanguage === "pt"
        ? browserLanguage
        : "en";

    this.translateService.use(language);

    this.activatedRoute.queryParamMap.subscribe({
      next: (github: any) => {
        if (github.params?.code) {
          this.authService
            .getGithubAccessToken(github.params.code)
            .pipe()
            .subscribe({
              next: (data: any) => {
                if (data) {
                  const user = this.authService.getUser();

                  if (!user) this.authStoreService.githubLogin();
                  else this.authStoreService.githubUpdateExistingUser(user._id);
                }
              },
              error: (err: any) => {
                console.log(err);
              },
            });
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthStoreService } from "../../../auth/services/auth-store.service";
import { AuthService } from "../../../auth/services/auth.service";
import { Observable } from "rxjs";
import { ThemeService } from "src/app/core/services/theme.service";

@Component({
  selector: "app-redirect",
  templateUrl: "./redirect.component.html",
  styleUrls: ["./redirect.component.scss"],
})
export class RedirectComponent implements OnInit {
  public theme$: Observable<string>;
  public currentTheme: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private authStoreService: AuthStoreService,
    private themeService: ThemeService
  ) {
    this.theme$ = this.themeService.selectedTheme;
  }

  ngOnInit() {
    this.theme$.subscribe((theme: string) => {
      this.currentTheme = theme;
    });

    this.activatedRoute.queryParamMap.subscribe({
      next: (github: any) => {
        if (github.params?.code) {
          this.authService
            .getGithubAccessToken(github.params.code)
            .pipe()
            .subscribe({
              next: (data: any) => {
                if (data) {
                  this.authStoreService.githubLogin();
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

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OAuthService } from "../../services/o-auth.service";
import { AuthStoreService } from "../../services/auth-store.service";

@Component({
  selector: "app-redirect",
  templateUrl: "./redirect.component.html",
  styleUrls: ["./redirect.component.scss"],
})
export class RedirectComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private oAuthService: OAuthService,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe({
      next: (github: any) => {
        if (github.params?.code) {
          this.oAuthService
            .getAccessToken(github.params.code)
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

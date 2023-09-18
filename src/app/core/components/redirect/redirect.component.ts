import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OAuthService } from "../../services/o-auth.service";

@Component({
  selector: "app-redirect",
  templateUrl: "./redirect.component.html",
  styleUrls: ["./redirect.component.scss"],
})
export class RedirectComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private oAuthService: OAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe({
      next: (github: any) => {
        console.log(github);
        if (github.params?.code) {
          this.oAuthService
            .getAccessToken(github.params.code)
            .pipe()
            .subscribe({
              next: (data: any) => {
                console.log(data);
                if (data) {
                  this.oAuthService.getUserDetails().subscribe({
                    next: (resp) => {
                      console.log(resp);
                      // this.router.navigate(["/dashboard"]);
                    },
                    error(err) {
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
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OAuthService } from "../../services/o-auth.service";
import { concatMap } from "rxjs";

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
    console.log("INIT");
    this.activatedRoute.queryParamMap
      .pipe(
        concatMap((x: any) => {
          return this.oAuthService.getAccessToken(x.get("code"));
        })
      )
      .subscribe({
        next: (data) => {
          this.router.navigate(["/dashboard"]);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}

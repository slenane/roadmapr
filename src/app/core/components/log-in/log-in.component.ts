import { Component, OnInit, Input } from "@angular/core";
import { TokenPayload } from "src/app/core/store/auth.models";
import { AuthStoreService } from "../../services/auth-store.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { OAuthService } from "../../services/o-auth.service";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"],
})
export class LogInComponent implements OnInit {
  public authUrl: string;
  public form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  public credentials: TokenPayload = {
    email: "",
    password: "",
  };

  @Input() theme: string;

  constructor(
    private authStoreService: AuthStoreService,
    private oAuthService: OAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.oAuthService.GetAuthPage().subscribe({
      next: (data: any) => (this.authUrl = data["authUrl"]),
      error: (err: any) => console.log(err),
    });
  }

  login() {
    this.credentials = {
      email: this.form.value.email || "",
      password: this.form.value.password || "",
    };
    this.authStoreService.login(this.credentials);
  }

  loginWithGithub() {
    if (this.authUrl) {
      this.router.navigate(["/github-auth"], {
        queryParams: { url: this.authUrl },
      });
    }
  }
}

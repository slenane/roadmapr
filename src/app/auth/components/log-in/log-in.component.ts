import { Component, OnInit, Input } from "@angular/core";
import { AuthStoreService } from "../../services/auth-store.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"],
})
export class LogInComponent implements OnInit {
  public hidePassword: boolean = true;
  public authUrl: string;
  public form = new FormGroup({
    emailCtrl: new FormControl("", [Validators.required, Validators.email]),
    passwordCtrl: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  @Input() theme: string;

  constructor(
    private authStoreService: AuthStoreService,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.authService.getGithubAuthPage().subscribe({
      next: (data: any) => (this.authUrl = data["authUrl"]),
      error: (err: any) => console.log(err),
    });
  }

  login() {
    if (this.form.valid) {
      this.authStoreService.login({
        email: this.form.value.emailCtrl,
        password: this.form.value.passwordCtrl,
      });
    }
  }

  loginWithGithub() {
    if (this.authUrl) {
      this.router.navigate(["/github-auth"], {
        queryParams: { url: this.authUrl },
      });
    }
  }

  showRegister() {
    this.location.replaceState("/register");
  }
}

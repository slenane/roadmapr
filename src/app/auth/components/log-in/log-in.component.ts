import { Component, OnInit, Input } from "@angular/core";
import { AuthStoreService } from "../../services/auth-store.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"],
})
export class LogInComponent implements OnInit {
  public hidePassword: boolean = true;
  public loginPending: boolean = false;
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
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params["verified"]) {
        this.snackBar.open(
          "Email verified successfully! Please login to continue",
          "Dismiss",
          { duration: 5000 }
        );
      }
    });

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

      this.form.disable();
      this.loginPending = true;
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

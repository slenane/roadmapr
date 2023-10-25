import { Component, OnInit, Input } from "@angular/core";
import { AuthStoreService } from "../../services/auth-store.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Location } from "@angular/common";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as authSelectors from "../../store/auth.selectors";
import * as authActions from "../../store/auth.actions";
import { AlertsService } from "src/app/shared/services/alerts.service";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"],
})
export class LogInComponent implements OnInit {
  private loginError$: Observable<boolean | null | undefined>;
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
    private alertsService: AlertsService,
    private store: Store
  ) {
    this.loginError$ = this.store.select(authSelectors.loginError);
  }

  ngOnInit(): void {
    this.loginError$.subscribe((error) => {
      if (error) {
        this.onLoginFailure();
        this.store.dispatch(authActions.clearLoginError());
      }
    });

    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params["verified"]) {
        this.alertsService.successAlert("AUTH.LOG_IN.EMAIL_VERIFIED");
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

  onLoginFailure() {
    this.form.enable();
    this.loginPending = false;
  }

  showForgotPassword() {
    this.location.replaceState("/reset-password");
  }

  showRegister() {
    this.location.replaceState("/register");
  }
}

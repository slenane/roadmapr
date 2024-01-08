import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { AuthStoreService } from "src/app/auth/services/auth-store.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { UpdateUsernameComponent } from "src/app/shared/components/forms/update-username/update-username.component";
import { UpdateEmailComponent } from "src/app/shared/components/forms/update-email/update-email.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { validPasswordPattern } from "src/app/shared/constants/validators.constants";
import { MatTooltip } from "@angular/material/tooltip";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as authSelectors from "../../store/auth.selectors";
import * as authActions from "../../store/auth.actions";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  private registrationError$: Observable<boolean | null | undefined>;
  private registrationSuccess$: Observable<boolean | null | undefined>;
  public passwordTooltipDisplay: boolean = false;
  public registrationPending: boolean = false;
  public registrationSuccessful: boolean = false;
  public resendEmailReady: boolean = false;
  public resendEmailTimeout: number;
  public hidePassword: boolean = true;
  public authUrl: string;
  public username: string = "";
  public email: string = "";
  public passwordForm = new FormGroup({
    passwordCtrl: new FormControl("", [
      Validators.required,
      Validators.pattern(validPasswordPattern),
    ]),
  });

  @Input() theme: string;

  @ViewChild("tooltip") tooltip: MatTooltip;
  @ViewChild("usernameUpdate") usernameUpdate: UpdateUsernameComponent;
  @ViewChild("emailUpdate") emailUpdate: UpdateEmailComponent;

  constructor(
    private authStoreService: AuthStoreService,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private store: Store,
    private translateService: TranslateService
  ) {
    this.registrationError$ = this.store.select(
      authSelectors.registrationError
    );
    this.registrationSuccess$ = this.store.select(
      authSelectors.registrationSuccess
    );
  }

  ngOnInit(): void {
    this.registrationError$.subscribe((error) => {
      if (error) {
        this.onRegisterFailure();
        this.store.dispatch(authActions.clearRegistrationError());
      }
    });
    this.registrationSuccess$.subscribe((success) => {
      if (success) this.onRegisterSuccess();
    });

    this.authService.getGithubAuthPage().subscribe({
      next: (data: any) => (this.authUrl = data["authUrl"]),
      error: (err: any) => console.log(err),
    });

    this.passwordForm.statusChanges.subscribe((status) => {
      if (
        !this.passwordForm.controls.passwordCtrl.hasError("required") &&
        status === "INVALID"
      ) {
        this.passwordTooltipDisplay = true;
        this.tooltip.show();
      } else {
        this.passwordTooltipDisplay = false;
      }
    });
  }

  register() {
    if (
      this.usernameUpdate.form.valid &&
      this.emailUpdate.form.valid &&
      this.passwordForm.valid
    ) {
      this.registrationPending = true;
      this.passwordForm.controls.passwordCtrl.disable();

      this.authStoreService.register({
        username: this.usernameUpdate.form.value.usernameCtrl,
        email: this.emailUpdate.form.value.emailCtrl,
        password: this.passwordForm.value.passwordCtrl,
        preferredLanguage: this.translateService.currentLang,
      });
    }
  }

  onRegisterSuccess() {
    this.registrationPending = false;
    this.registrationSuccessful = true;
    this.resendEmailTimeout = 60;

    const resendInterval = setInterval(() => {
      this.resendEmailTimeout--;
      if (this.resendEmailTimeout === 0) {
        this.resendEmailReady = true;
        clearInterval(resendInterval);
      }
    }, 1000);
  }

  onRegisterFailure() {
    this.registrationPending = false;
    this.registrationSuccessful = false;
    this.passwordForm.controls.passwordCtrl.enable();
  }

  registerWithGithub() {
    if (this.authUrl) {
      this.router.navigate(["/github-auth"], {
        queryParams: { url: this.authUrl },
      });
    }
  }

  showLogin() {
    this.location.replaceState("/login");
  }
}

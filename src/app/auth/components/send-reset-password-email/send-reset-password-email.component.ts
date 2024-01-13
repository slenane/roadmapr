import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { AuthStoreService } from "../../services/auth-store.service";
import { Store } from "@ngrx/store";
import * as authSelectors from "../../store/auth.selectors";
import * as authActions from "../../store/auth.actions";
import { Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-send-reset-password-email",
  templateUrl: "./send-reset-password-email.component.html",
  styleUrls: ["./send-reset-password-email.component.scss"],
})
export class SendResetPasswordEmailComponent implements OnInit {
  private sendResetPasswordEmailError$: Observable<boolean | null | undefined>;
  private sendResetPasswordEmailSuccess$: Observable<
    boolean | null | undefined
  >;
  public sendResetPasswordEmailPending: boolean = false;
  public sendResetPasswordEmailSuccessful: boolean = false;
  public resendEmailReady: boolean = false;
  public resendEmailTimeout: number;

  public form = new FormGroup({
    emailCtrl: new FormControl("", [Validators.required, Validators.email]),
  });

  constructor(
    private authStoreService: AuthStoreService,
    private location: Location,
    private store: Store,
    private translateService: TranslateService
  ) {
    this.sendResetPasswordEmailError$ = this.store.select(
      authSelectors.sendResetPasswordEmailError
    );
    this.sendResetPasswordEmailSuccess$ = this.store.select(
      authSelectors.sendResetPasswordEmailSuccess
    );
  }

  ngOnInit(): void {
    this.sendResetPasswordEmailError$.subscribe((error) => {
      if (error) {
        this.onSendResetPasswordEmailFailure();
        this.store.dispatch(authActions.clearSendResetPasswordEmailError());
      }
    });
    this.sendResetPasswordEmailSuccess$.subscribe((success) => {
      if (success) this.onSendResetPasswordEmailSuccess();
    });
  }

  sendResetPasswordEmail() {
    if (this.form.value.emailCtrl) {
      this.sendResetPasswordEmailPending = true;
      this.form.controls.emailCtrl.disable();
      this.authStoreService.sendPasswordResetEmail({
        email: this.form.value.emailCtrl,
        preferredLanguage: this.translateService.currentLang,
      });
    }
  }

  onSendResetPasswordEmailSuccess() {
    this.sendResetPasswordEmailPending = false;
    this.sendResetPasswordEmailSuccessful = true;
    this.resendEmailTimeout = 60;

    const resendInterval = setInterval(() => {
      this.resendEmailTimeout--;
      if (this.resendEmailTimeout === 0) {
        this.resendEmailReady = true;
        clearInterval(resendInterval);
      }
    }, 1000);
  }

  onSendResetPasswordEmailFailure() {
    this.sendResetPasswordEmailPending = false;
    this.sendResetPasswordEmailSuccessful = false;
    this.form.controls.emailCtrl.enable();
  }
}

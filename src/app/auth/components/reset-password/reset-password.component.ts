import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { AuthStoreService } from "../../services/auth-store.service";
import { UpdatePasswordInputsComponent } from "src/app/shared/components/forms/update-password/update-password-inputs/update-password-inputs.component";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordPending: boolean = false;
  public verificationToken: string;

  @ViewChild("inputs") inputs: UpdatePasswordInputsComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authStoreService: AuthStoreService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params["token"]) {
        this.verificationToken = params["token"];
      } else {
        this.showSendResetPasswordEmail();
      }
    });
  }

  resetPassword() {
    const password = this.inputs.form.value.newPasswordCtrl;
    if (this.verificationToken && this.inputs.form.valid && password) {
      this.authStoreService.resetPassword(this.verificationToken, password);
    }
  }

  showSendResetPasswordEmail() {
    this.location.replaceState("/send-reset-password-email");
  }

  showLogin() {
    this.location.replaceState("/login");
  }
}

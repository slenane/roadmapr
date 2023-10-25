import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { AuthStoreService } from "../../services/auth-store.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  emailSending: boolean = false;

  public form = new FormGroup({
    emailCtrl: new FormControl("", [Validators.required, Validators.email]),
  });

  constructor(
    private authStoreService: AuthStoreService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  sendResetPasswordEmail() {
    if (this.form.value.emailCtrl) {
      this.authStoreService.sendPasswordResetEmail(this.form.value.emailCtrl);
    }
  }

  showLogin() {
    this.location.replaceState("/login");
  }
}

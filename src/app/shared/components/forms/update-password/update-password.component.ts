import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  passwordMatchValidator,
  validPasswordPattern,
} from "../../../constants/validators.constants";

@Component({
  selector: "app-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.scss"],
})
export class UpdatePasswordComponent implements OnInit {
  public hidePasswords: boolean = true;
  public passwordMatch: boolean = false;
  public updatePasswordForm = new FormGroup(
    {
      newPasswordCtrl: new FormControl("", [
        Validators.required,
        Validators.pattern(validPasswordPattern),
      ]),
      newPasswordConfirmCtrl: new FormControl("", [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  @Output() togglePasswordUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onSavePassword: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.updatePasswordForm.valueChanges.subscribe((form) => {
      const newPassword = this.formControls.newPasswordCtrl;
      const newPasswordConfirm = this.formControls.newPasswordConfirmCtrl;

      if (
        !newPassword.hasError("required") &&
        !newPassword.hasError("pattern") &&
        !newPasswordConfirm.hasError("required")
      ) {
        if (form.newPasswordCtrl !== form.newPasswordConfirmCtrl) {
          newPasswordConfirm.setErrors({ mismatch: true });
        } else {
          if (newPassword.hasError("mismatch")) {
            delete newPassword.errors?.mismatch;
          }
          if (newPasswordConfirm.hasError("mismatch")) {
            delete newPasswordConfirm.errors?.mismatch;
          }
        }
      }
    });
  }

  isPasswordMatch(): boolean {
    return (
      this.updatePasswordForm.value.newPasswordCtrl ===
      this.updatePasswordForm.value.newPasswordConfirmCtrl
    );
  }

  onSaveClick(): void {
    if (
      this.updatePasswordForm.valid &&
      this.updatePasswordForm.value.newPasswordCtrl &&
      this.updatePasswordForm.value.newPasswordConfirmCtrl &&
      this.isPasswordMatch()
    ) {
      this.onSavePassword.emit(this.updatePasswordForm.value.newPasswordCtrl);
    }
  }

  get formControls() {
    return this.updatePasswordForm.controls;
  }
}

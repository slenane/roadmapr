import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  passwordMatchValidator,
  validPasswordPattern,
  conditionalRequiredValidator,
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
      currentPasswordCtrl: new FormControl("", [
        Validators.pattern(validPasswordPattern),
      ]),
      newPasswordCtrl: new FormControl("", [
        Validators.required,
        Validators.pattern(validPasswordPattern),
      ]),
      newPasswordConfirmCtrl: new FormControl("", [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  @Input() hasPassword: boolean;
  @Output() togglePasswordUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onSavePassword: EventEmitter<string> = new EventEmitter();
  @Output() onUpdatePassword: EventEmitter<{ current: string; new: string }> =
    new EventEmitter();

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

    this.updatePasswordForm.controls.currentPasswordCtrl.setValidators([
      conditionalRequiredValidator(this.hasPassword),
    ]);
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
      if (!this.hasPassword) {
        this.onSavePassword.emit(this.updatePasswordForm.value.newPasswordCtrl);
      } else if (
        this.hasPassword &&
        this.updatePasswordForm.value.currentPasswordCtrl
      ) {
        this.onUpdatePassword.emit({
          current: this.updatePasswordForm.value.currentPasswordCtrl,
          new: this.updatePasswordForm.value.newPasswordCtrl,
        });
      }
    }
  }

  get formControls() {
    return this.updatePasswordForm.controls;
  }
}

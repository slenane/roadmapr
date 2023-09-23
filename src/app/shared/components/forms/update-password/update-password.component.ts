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

  ngOnInit(): void {}

  isPasswordMatch(): boolean {
    return (
      this.updatePasswordForm.value.newPasswordCtrl ===
      this.updatePasswordForm.value.newPasswordConfirmCtrl
    );
  }

  checkMatchOnBlur() {
    if (!this.isPasswordMatch()) {
      this.updatePasswordForm.controls.newPasswordConfirmCtrl.setErrors({
        mismatch: true,
      });
      this.updatePasswordForm.markAllAsTouched();
    }
  }

  onSaveClick(): void {
    if (
      this.updatePasswordForm.value.newPasswordCtrl &&
      this.updatePasswordForm.valid &&
      this.isPasswordMatch()
    ) {
      this.onSavePassword.emit(this.updatePasswordForm.value.newPasswordCtrl);
    }
  }
}

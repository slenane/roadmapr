import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTooltip } from "@angular/material/tooltip";
import {
  passwordMatchValidator,
  validPasswordPattern,
  conditionalRequiredValidator,
} from "src/app/shared/constants/validators.constants";

@Component({
  selector: "app-update-password-inputs",
  templateUrl: "./update-password-inputs.component.html",
  styleUrls: ["./update-password-inputs.component.scss"],
})
export class UpdatePasswordInputsComponent implements OnInit {
  public hidePasswords: boolean = true;
  public passwordMatch: boolean = false;
  public passwordTooltipDisplay: boolean = false;
  public form = new FormGroup(
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
  @Input() tooltipHint: boolean;
  @ViewChild("tooltip") tooltip: MatTooltip;

  constructor() {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((form) => {
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

      this.form.statusChanges.subscribe((status) => {
        if (
          !this.form.controls.newPasswordCtrl.hasError("required") &&
          status === "INVALID"
        ) {
          this.passwordTooltipDisplay = true;
          this.tooltip.show();
        } else {
          this.passwordTooltipDisplay = false;
        }
      });
    });

    this.form.controls.currentPasswordCtrl.setValidators([
      conditionalRequiredValidator(this.hasPassword),
    ]);
  }

  isPasswordMatch(): boolean {
    return (
      this.form.value.newPasswordCtrl === this.form.value.newPasswordConfirmCtrl
    );
  }

  get formControls() {
    return this.form.controls;
  }
}

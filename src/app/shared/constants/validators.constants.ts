import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get("newPasswordCtrl");
  const confirmPassword = control.get("newPasswordConfirmCtrl");
  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { mismatch: true };
};

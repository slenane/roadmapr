import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const validPasswordPattern =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get("newPasswordCtrl");
  const confirmPassword = control.get("newPasswordConfirmCtrl");
  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { mismatch: true };
};

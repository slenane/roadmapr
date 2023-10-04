import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
// import * as COUNTRY_LIST from "src/assets/json/country-list.json";

export const validateConfirmPattern = "SETTINGS.DELETE.CONFIRM | translate";

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

// export const countryMatchValidator: ValidatorFn = (
//   control: AbstractControl
// ): ValidationErrors | null => {
//   const password = control.get("newPasswordCtrl");
//   const confirmPassword = control.get("newPasswordConfirmCtrl");
//   return password && confirmPassword && password.value === confirmPassword.value
//     ? null
//     : { mismatch: true };
// };

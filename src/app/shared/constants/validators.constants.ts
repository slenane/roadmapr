import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
// import * as COUNTRY_LIST from "src/assets/json/country-list.json";

export const validateConfirmPattern = "SETTINGS.DELETE.CONFIRM | translate";

export const validPasswordPattern =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

export const validUsernamePattern = /^[^\s]{3,20}$/;

export const validLinkPattern =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?[a-z\d\.\-_%&=\+]+)?$/;

export const validYouTubeLink =
  /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}/;

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get("newPasswordCtrl");
  const confirmPassword = control.get("newPasswordConfirmCtrl");
  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { mismatch: true };
};

export function conditionalRequiredValidator(condition: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (condition && !control.value) {
      return { required: true };
    }
    return null;
  };
}

export const validEducationUrlValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.match(validLinkPattern) ||
    control.value.match(validYouTubeLink)
    ? null
    : { pattern: true };
};

export const dateRangeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const startDate = control.get("startDate");
  const endDate = control.get("endDate");

  if (!startDate && endDate) {
    return { startDateRequiredValidator: true };
  }

  if (startDate && endDate) {
    const originalStartDate = new Date(startDate.value);
    const originalEndDate = new Date(endDate.value);

    const start = new Date(
      originalStartDate.getFullYear(),
      originalStartDate.getMonth(),
      originalStartDate.getDate()
    );
    const end = new Date(
      originalEndDate.getFullYear(),
      originalEndDate.getMonth(),
      originalEndDate.getDate()
    );

    if (start.getTime() > end.getTime()) {
      return { dateRangeValidator: true };
    }
  }

  return null;
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

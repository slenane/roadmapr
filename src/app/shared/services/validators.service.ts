import { Injectable } from "@angular/core";
import { AsyncValidatorFn } from "@angular/forms";
import { debounceTime, distinctUntilChanged, switchMap, take, of } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class ValidatorsService {
  constructor(private authService: AuthService) {}

  validateUsername(initial: string): AsyncValidatorFn {
    return (control) => {
      if (
        !control.valueChanges ||
        control.pristine ||
        !control.value.length ||
        control.value === initial
      ) {
        return of(null);
      } else {
        return control.valueChanges.pipe(
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(() => {
            return this.authService.checkUniqueUsername(control.value);
          }),
          take(1)
        );
      }
    };
  }

  validateEmail(initial: string): AsyncValidatorFn {
    return (control) => {
      if (
        !control.valueChanges ||
        control.pristine ||
        !control.value.length ||
        control.value === initial
      ) {
        return of(null);
      } else {
        return control.valueChanges.pipe(
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(() => {
            return this.authService.checkUniqueEmail(control.value);
          }),
          take(1)
        );
      }
    };
  }
}

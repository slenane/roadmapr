import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { validUsernamePattern } from "src/app/shared/constants/validators.constants";
import { MyErrorStateMatcher } from "src/app/shared/services/error-state-matcher.service";
import { ValidatorsService } from "src/app/shared/services/validators.service";

@Component({
  selector: "app-update-username",
  templateUrl: "./update-username.component.html",
  styleUrls: ["./update-username.component.scss"],
})
export class UpdateUsernameComponent implements OnInit, OnChanges {
  public matcher = new MyErrorStateMatcher();
  public initialUsername: string;
  public form = new FormGroup({
    usernameCtrl: new FormControl("", [
      Validators.required,
      Validators.pattern(validUsernamePattern),
    ]),
  });

  @Input() username: string | undefined;
  @Input() disabled: boolean;

  constructor(private validatorsService: ValidatorsService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.username &&
      changes.username.currentValue !== changes.username.previousValue
    ) {
      this.updateForm(changes.username.currentValue);
    }
    if (
      changes.disabled &&
      changes.disabled.currentValue !== changes.disabled.previousValue
    ) {
      this.toggleFormEnabled(changes.disabled.currentValue);
    }
  }

  updateForm(username: string) {
    if (!username) username = "";

    this.form.patchValue({
      usernameCtrl: username,
    });

    this.form.controls.usernameCtrl.addAsyncValidators([
      this.validatorsService.validateUsername(username),
    ]);

    this.initialUsername = username;
  }

  toggleFormEnabled(disabled: boolean) {
    if (disabled) this.form.controls.usernameCtrl.disable();
    else this.form.controls.usernameCtrl.enable();
  }
}

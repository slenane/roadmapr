import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
    usernameCtrl: new FormControl("", [Validators.required]),
  });

  @Input() username: string | undefined;
  @Input() isEditing: boolean;

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
      changes.isEditing &&
      changes.isEditing.currentValue !== changes.isEditing.previousValue
    ) {
      this.toggleFormEnabled(changes.isEditing.currentValue);
    }
  }

  toggleFormEnabled(enabled: boolean) {
    if (enabled) this.form.controls.usernameCtrl.enable();
    else this.form.controls.usernameCtrl.disable();
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
}

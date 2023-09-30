import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MyErrorStateMatcher } from "src/app/shared/services/error-state-matcher.service";
import { ValidatorsService } from "src/app/shared/services/validators.service";

@Component({
  selector: "app-update-email",
  templateUrl: "./update-email.component.html",
  styleUrls: ["./update-email.component.scss"],
})
export class UpdateEmailComponent implements OnInit, OnChanges {
  public matcher = new MyErrorStateMatcher();
  public initialEmail: string;
  public form = new FormGroup({
    emailCtrl: new FormControl("", [Validators.required, Validators.email]),
  });

  @Input() email: string | undefined;
  @Input() isEditing: boolean;

  constructor(private validatorsService: ValidatorsService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.email &&
      changes.email.currentValue !== changes.email.previousValue
    ) {
      this.updateForm(changes.email.currentValue);
    }
    if (
      changes.isEditing &&
      changes.isEditing.currentValue !== changes.isEditing.previousValue
    ) {
      this.toggleFormEnabled(changes.isEditing.currentValue);
    }
  }

  updateForm(email: string) {
    if (!email) email = "";

    this.form.patchValue({
      emailCtrl: email,
    });

    this.form.controls.emailCtrl.addAsyncValidators([
      this.validatorsService.validateEmail(email),
    ]);

    this.initialEmail = email;
  }

  toggleFormEnabled(enabled: boolean) {
    if (enabled) this.form.controls.emailCtrl.enable();
    else this.form.controls.emailCtrl.disable();
  }
}

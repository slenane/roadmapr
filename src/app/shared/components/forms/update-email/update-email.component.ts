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
  public emailForm = new FormGroup({
    emailCtrl: new FormControl("", [Validators.required, Validators.email]),
  });

  @Input() email: string | undefined;
  @Input() isEditing: boolean;
  @Output() onHideEditor: EventEmitter<any> = new EventEmitter();
  @Output() onSaveEmail: EventEmitter<string> = new EventEmitter();

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

    this.emailForm.patchValue({
      emailCtrl: email,
    });

    this.emailForm.controls.emailCtrl.addAsyncValidators([
      this.validatorsService.validateEmail(email),
    ]);

    this.initialEmail = email;
  }

  toggleFormEnabled(enabled: boolean) {
    if (enabled) this.emailForm.controls.emailCtrl.enable();
    else this.emailForm.controls.emailCtrl.disable();
  }

  onCancel() {
    this.emailForm.reset();
    this.emailForm.patchValue({ emailCtrl: this.email });
    this.onHideEditor.emit();
  }

  onSave() {
    if (this.emailForm.valid && this.emailForm.value.emailCtrl) {
      const email = this.emailForm.value.emailCtrl;
      this.onSaveEmail.emit(email);
      this.emailForm.reset();
      this.emailForm.patchValue({ emailCtrl: email });
    }
  }
}

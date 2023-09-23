import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ValidatorsService } from "src/app/shared/services/validators.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: "app-update-username",
  templateUrl: "./update-username.component.html",
  styleUrls: ["./update-username.component.scss"],
})
export class UpdateUsernameComponent implements OnInit {
  public matcher = new MyErrorStateMatcher();
  public initialUsername: string;
  public usernameForm = new FormGroup({
    usernameCtrl: new FormControl("", [Validators.required]),
  });

  @Input() username: string | undefined;
  @Input() isEditing: boolean;
  @Output() onHideEditor: EventEmitter<any> = new EventEmitter();
  @Output() onSaveUsername: EventEmitter<string> = new EventEmitter();

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

  updateForm(username: string) {
    if (!username) username = "";

    this.usernameForm.patchValue({
      usernameCtrl: username,
    });

    this.usernameForm.controls.usernameCtrl.addAsyncValidators([
      this.validatorsService.validateUsername(username),
    ]);

    this.initialUsername = username;
  }

  toggleFormEnabled(enabled: boolean) {
    if (enabled) this.usernameForm.controls.usernameCtrl.enable();
    else this.usernameForm.controls.usernameCtrl.disable();
  }

  onCancel() {
    this.usernameForm.reset();
    this.usernameForm.patchValue({ usernameCtrl: this.username });
    this.onHideEditor.emit();
  }

  onSave() {
    if (this.usernameForm.valid && this.usernameForm.value.usernameCtrl) {
      const username = this.usernameForm.value.usernameCtrl;
      this.onSaveUsername.emit(username);
      this.usernameForm.reset();
      this.usernameForm.patchValue({ usernameCtrl: username });
    }
  }
}

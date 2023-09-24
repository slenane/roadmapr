import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
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
  public usernameForm = new FormGroup({
    usernameCtrl: new FormControl("", [Validators.required]),
  });

  @Input() username: string | undefined;
  @Input() isEditing: boolean;
  @Output() toggleUsernameUpdate: EventEmitter<any> = new EventEmitter();
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
    this.toggleUsernameUpdate.emit();
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

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  passwordMatchValidator,
  validPasswordPattern,
} from "../../constants/validators.constants";
import { SettingsStoreService } from "src/app/settings/services/settings-store.service";

@Component({
  selector: "app-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.scss"],
})
export class UpdatePasswordComponent implements OnInit {
  public hidePasswords: boolean = true;

  public updatePasswordForm = new FormGroup(
    {
      newPasswordCtrl: new FormControl("", [
        Validators.required,
        Validators.pattern(validPasswordPattern),
      ]),
      newPasswordConfirmCtrl: new FormControl("", [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  @Input() userId: string;
  @Output() onHideEditor: EventEmitter<any> = new EventEmitter();

  constructor(private settingsStoreService: SettingsStoreService) {}

  ngOnInit(): void {}

  isPasswordMatch(): boolean {
    return (
      this.updatePasswordForm.value.newPasswordCtrl ===
      this.updatePasswordForm.value.newPasswordConfirmCtrl
    );
  }

  checkMatchOnBlur() {
    if (!this.isPasswordMatch()) {
      this.updatePasswordForm.controls.newPasswordConfirmCtrl.setErrors({
        mismatch: true,
      });
      this.updatePasswordForm.markAllAsTouched();
    }
  }

  onSaveClick(): void {
    if (this.isPasswordMatch()) {
      return; // Check later
      this.settingsStoreService.updateSettings(this.userId, {
        password: this.updatePasswordForm.value.newPasswordCtrl,
      });
    }
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { UpdatePasswordInputsComponent } from "./update-password-inputs/update-password-inputs.component";

@Component({
  selector: "app-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.scss"],
})
export class UpdatePasswordComponent implements OnInit {
  @Input() hasPassword: boolean;
  @Output() togglePasswordUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onSavePassword: EventEmitter<string> = new EventEmitter();
  @Output() onUpdatePassword: EventEmitter<{ current: string; new: string }> =
    new EventEmitter();

  @ViewChild("inputs") inputs: UpdatePasswordInputsComponent;

  constructor() {}

  ngOnInit(): void {}

  onSaveClick(): void {
    if (
      this.inputs.form.valid &&
      this.inputs.form.value.newPasswordCtrl &&
      this.inputs.form.value.newPasswordConfirmCtrl &&
      this.inputs.isPasswordMatch()
    ) {
      if (!this.hasPassword) {
        this.onSavePassword.emit(this.inputs.form.value.newPasswordCtrl);
      } else if (
        this.hasPassword &&
        this.inputs.form.value.currentPasswordCtrl
      ) {
        this.onUpdatePassword.emit({
          current: this.inputs.form.value.currentPasswordCtrl,
          new: this.inputs.form.value.newPasswordCtrl,
        });
      }
    }
  }
}

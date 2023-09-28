import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { UpdateUsernameComponent } from "src/app/shared/components/forms/update-username/update-username.component";

@Component({
  selector: "app-settings-update-username",
  templateUrl: "./settings-update-username.component.html",
  styleUrls: ["./settings-update-username.component.scss"],
})
export class SettingsUpdateUsernameComponent implements OnInit {
  @Input() username: string | undefined;
  @Input() isEditing: boolean;
  @Output() toggleUsernameUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onSaveUsername: EventEmitter<string> = new EventEmitter();

  @ViewChild("usernameUpdate") usernameUpdate: UpdateUsernameComponent;

  constructor() {}

  ngOnInit(): void {}

  onCancel() {
    this.usernameUpdate.form.reset();
    this.usernameUpdate.form.patchValue({ usernameCtrl: this.username });
    this.toggleUsernameUpdate.emit();
  }

  onSave() {
    if (
      this.usernameUpdate.form.valid &&
      this.usernameUpdate.form.value.usernameCtrl
    ) {
      const username = this.usernameUpdate.form.value.usernameCtrl;
      this.onSaveUsername.emit(username);
      this.usernameUpdate.form.reset();
      this.usernameUpdate.form.patchValue({ usernameCtrl: username });
    }
  }
}

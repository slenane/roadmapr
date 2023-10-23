import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { UpdateEmailComponent } from "src/app/shared/components/forms/update-email/update-email.component";

@Component({
  selector: "app-settings-update-email",
  templateUrl: "./settings-update-email.component.html",
  styleUrls: ["./settings-update-email.component.scss"],
})
export class SettingsUpdateEmailComponent implements OnInit {
  @Input() email: string | undefined;
  @Input() isEditing: boolean;
  @Output() toggleEmailUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onSaveEmail: EventEmitter<string> = new EventEmitter();

  @ViewChild("emailUpdate") emailUpdate: UpdateEmailComponent;

  constructor() {}

  ngOnInit(): void {}

  onCancel() {
    this.emailUpdate.form.reset();
    this.emailUpdate.form.patchValue({ emailCtrl: this.email });
    this.toggleEmailUpdate.emit();
  }

  onSave() {
    if (this.emailUpdate.form.valid && this.emailUpdate.form.value.emailCtrl) {
      const email = this.emailUpdate.form.value.emailCtrl;
      this.onSaveEmail.emit(email);
      this.emailUpdate.form.reset();
      this.emailUpdate.form.patchValue({ emailCtrl: this.email });
    }
  }
}

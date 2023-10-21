import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Input,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Profile } from "src/app/profile/store/profile.models";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-profile-edit-interests",
  templateUrl: "./profile-edit-interests.component.html",
  styleUrls: ["./profile-edit-interests.component.scss"],
})
export class ProfileEditInterestsComponent implements OnInit {
  public form = new FormGroup({
    personalCtrl: new FormControl(""),
    professionalCtrl: new FormControl(""),
  });

  @Input() user: Profile;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.user &&
      changes.user.currentValue != changes.user.previousValue
    ) {
      this.updateForm(changes.user.currentValue);
    }
  }

  updateForm(user: any) {
    this.form.patchValue({
      personalCtrl: user.interests.personal_interests,
      professionalCtrl: user.interests.professional_interests,
    });
  }
}

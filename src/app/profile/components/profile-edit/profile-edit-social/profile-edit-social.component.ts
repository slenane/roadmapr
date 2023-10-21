import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Profile } from "src/app/profile/store/profile.models";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-profile-edit-social",
  templateUrl: "./profile-edit-social.component.html",
  styleUrls: ["./profile-edit-social.component.scss"],
})
export class ProfileEditSocialComponent implements OnInit, OnChanges {
  public form = new FormGroup({
    cvCtrl: new FormControl(""),
    linkedInCtrl: new FormControl(""),
    portfolioCtrl: new FormControl(""),
    xCtrl: new FormControl(""),
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
      cvCtrl: user.links.cv,
      linkedInCtrl: user.links.linkedIn,
      portfolioCtrl: user.links.portfolio,
      xCtrl: user.links.twitter,
    });
  }
}

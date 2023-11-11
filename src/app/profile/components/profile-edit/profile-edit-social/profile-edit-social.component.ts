import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Profile } from "src/app/profile/store/profile.models";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { validLinkPattern } from "src/app/shared/constants/validators.constants";

@Component({
  selector: "app-profile-edit-social",
  templateUrl: "./profile-edit-social.component.html",
  styleUrls: ["./profile-edit-social.component.scss"],
})
export class ProfileEditSocialComponent implements OnInit, OnChanges {
  public form = new FormGroup({
    cvCtrl: new FormControl("", [Validators.pattern(validLinkPattern)]),
    linkedInCtrl: new FormControl("", [Validators.pattern(validLinkPattern)]),
    portfolioCtrl: new FormControl("", [Validators.pattern(validLinkPattern)]),
    xCtrl: new FormControl("", [Validators.pattern(validLinkPattern)]),
  });

  @Input() user: Profile;

  @ViewChild("cv") cv: ElementRef;
  @ViewChild("linkedIn") linkedIn: ElementRef;
  @ViewChild("portfolio") portfolio: ElementRef;
  @ViewChild("x") x: ElementRef;

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

  focusErrorInput() {
    for (const input of Object.keys(this.form.controls)) {
      const control = this.form.get(input);

      if (control?.invalid) {
        this.form.markAllAsTouched();
        this.form.markAsDirty();

        if (input === "cvCtrl") this.cv.nativeElement.focus();
        if (input === "linkedInCtrl") this.linkedIn.nativeElement.focus();
        if (input === "portfolioCtrl") this.portfolio.nativeElement.focus();
        if (input === "xCtrl") this.x.nativeElement.focus();

        return true;
      }
    }
    return false;
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

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
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DEV_PATHS } from "src/app/shared/constants/dev-paths.constants";

@Component({
  selector: "app-profile-edit-basic-info",
  templateUrl: "./profile-edit-basic-info.component.html",
  styleUrls: ["./profile-edit-basic-info.component.scss"],
})
export class ProfileEditBasicInfoComponent implements OnInit, OnChanges {
  public paths = DEV_PATHS;

  public form = new FormGroup({
    bioCtrl: new FormControl(""),
    locationCtrl: new FormControl("", Validators.required),
    firstNameCtrl: new FormControl("", Validators.required),
    lastNameCtrl: new FormControl("", Validators.required),
    nationalityCtrl: new FormControl("", Validators.required),
    pathCtrl: new FormControl("", Validators.required),
  });

  @Input() user: Profile;

  @ViewChild("location") location: ElementRef;
  @ViewChild("firstName") firstName: ElementRef;
  @ViewChild("lastName") lastName: ElementRef;
  @ViewChild("nationality") nationality: ElementRef;
  @ViewChild("path") path: ElementRef;

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
      bioCtrl: user.bio,
      locationCtrl: user.location,
      firstNameCtrl: user.firstName,
      lastNameCtrl: user.lastName,
      nationalityCtrl: user.nationality,
      pathCtrl: user.path,
    });
  }
}

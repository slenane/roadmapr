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
import { COUNTRY_LIST } from "src/app/shared/constants/country-list.constants";

@Component({
  selector: "app-profile-edit-basic-info",
  templateUrl: "./profile-edit-basic-info.component.html",
  styleUrls: ["./profile-edit-basic-info.component.scss"],
})
export class ProfileEditBasicInfoComponent implements OnInit, OnChanges {
  public COUNTRY_LIST = COUNTRY_LIST;
  public DEV_PATHS = DEV_PATHS;

  public form = new FormGroup({
    bioCtrl: new FormControl(""),
    locationCtrl: new FormControl<any>({}, Validators.required),
    firstNameCtrl: new FormControl("", Validators.required),
    lastNameCtrl: new FormControl("", Validators.required),
    nationalityCtrl: new FormControl<any>({}, Validators.required),
    pathCtrl: new FormControl<any>({}, Validators.required),
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

  focusErrorInput() {
    for (const input of Object.keys(this.form.controls)) {
      const control = this.form.get(input);

      if (control?.invalid) {
        this.form.markAllAsTouched();
        this.form.markAsDirty();

        if (input === "locationCtrl") this.location.nativeElement.focus();
        if (input === "firstNameCtrl") this.firstName.nativeElement.focus();
        if (input === "lastNameCtrl") this.lastName.nativeElement.focus();
        if (input === "nationalityCtrl") this.nationality.nativeElement.focus();
        if (input === "pathCtrl") this.path.nativeElement.focus();

        return true;
      }
    }
    return false;
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

  compareValues(a: any, b: any): boolean {
    return a && b && a.id === b.id;
  }
}

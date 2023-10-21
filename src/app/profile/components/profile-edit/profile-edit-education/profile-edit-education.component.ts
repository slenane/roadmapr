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
import { FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
import { EDUCATION_LEVELS } from "src/app/shared/constants/education.constants";

@Component({
  selector: "app-profile-edit-education",
  templateUrl: "./profile-edit-education.component.html",
  styleUrls: ["./profile-edit-education.component.scss"],
})
export class ProfileEditEducationComponent implements OnInit {
  public EDUCATION_LEVELS = EDUCATION_LEVELS;

  public form = new FormGroup({
    previousEducationCtrl: new FormArray<any>([]),
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
    if (user.previousEducation) {
      this.form.controls.previousEducationCtrl.controls = [];
      for (let education of user.previousEducation) {
        this.form.controls.previousEducationCtrl.push(
          new FormGroup({
            subject: new FormControl(education.subject),
            school: new FormControl(education.school),
            level: new FormControl(education.level),
          })
        );
      }
    }
  }

  addPreviousEducationControl() {
    this.form.controls.previousEducationCtrl.push(
      new FormGroup({
        subject: new FormControl(""),
        school: new FormControl(""),
        level: new FormControl(""),
      })
    );
  }

  compareValues(a: any, b: any): boolean {
    return a && b && a.id === b.id;
  }
}

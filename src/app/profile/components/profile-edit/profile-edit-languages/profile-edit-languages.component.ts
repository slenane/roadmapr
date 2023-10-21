import {
  Component,
  ElementRef,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Profile } from "src/app/profile/store/profile.models";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import {
  LANGUAGE_LIST,
  LANGUAGE_LEVELS,
} from "src/app/shared/constants/languages.constants";

@Component({
  selector: "app-profile-edit-languages",
  templateUrl: "./profile-edit-languages.component.html",
  styleUrls: ["./profile-edit-languages.component.scss"],
})
export class ProfileEditLanguagesComponent implements OnInit, OnChanges {
  public LANGUAGE_LIST = LANGUAGE_LIST;
  public LANGUAGE_LEVELS = LANGUAGE_LEVELS;

  public form = new FormGroup({
    languagesCtrl: new FormArray<any>([]),
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
    console.log(user);
    if (user.languagesSpoken) {
      this.form.controls.languagesCtrl.controls = [];
      for (let language of user.languagesSpoken) {
        this.form.controls.languagesCtrl.push(
          new FormGroup({
            language: new FormControl(language.language),
            level: new FormControl(language.level),
          })
        );
      }
    }
  }

  addLanguageControl() {
    this.form.controls.languagesCtrl.push(
      new FormGroup({
        language: new FormControl(""),
        level: new FormControl(""),
      })
    );
  }

  compareValues(a: any, b: any): boolean {
    return a && b && a.id === b.id;
  }
}

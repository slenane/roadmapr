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

@Component({
  selector: "app-profile-edit-languages",
  templateUrl: "./profile-edit-languages.component.html",
  styleUrls: ["./profile-edit-languages.component.scss"],
})
export class ProfileEditLanguagesComponent implements OnInit, OnChanges {
  public languageList = ["English", "Spanish", "Italian", "Japanese"];
  public levelList = [
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2",
    "Proficient",
    "Native",
  ];

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
}

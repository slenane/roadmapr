import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { DEV_PATHS } from "src/app/shared/constants/dev-paths.constants";
import { COUNTRY_LIST } from "src/app/shared/constants/country-list";
import { UserSetupPathQuizComponent } from "../user-setup-path-quiz/user-setup-path-quiz.component";

@Component({
  selector: "app-user-setup-basic-details",
  templateUrl: "./user-setup-basic-details.component.html",
  styleUrls: ["./user-setup-basic-details.component.scss"],
})
export class UserSetupBasicDetailsComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public countryList = COUNTRY_LIST;
  public paths = DEV_PATHS;

  public basicDetailsForm = new FormGroup({
    firstNameCtrl: new FormControl("", Validators.required),
    lastNameCtrl: new FormControl("", Validators.required),
    profileImageCtrl: new FormControl("", Validators.required),
    locationCtrl: new FormControl("", Validators.required), // Add validator for country
    nationalityCtrl: new FormControl("", Validators.required), // Add validator for country
    // preferredLanguageCtrl: new FormControl("", Validators.required),
  });

  public pathForm = new FormGroup({
    pathCtrl: new FormControl("", Validators.required),
  });

  @ViewChild("firstName") firstNameCtrl: ElementRef;
  @ViewChild("lastName") lastNameCtrl: ElementRef;
  @ViewChild("profileImage") profileImageCtrl: ElementRef;
  @ViewChild("location") locationCtrl: ElementRef;
  @ViewChild("nationality") nationalityCtrl: ElementRef;
  // @ViewChild("preferredLanguage") preferredLanguageCtrl: ElementRef;

  @ViewChild("path") pathCtrl: ElementRef;

  constructor(
    private el: ElementRef,
    public dialogRef: MatDialogRef<UserSetupBasicDetailsComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  focusError() {
    for (const key of Object.keys(this.basicDetailsForm.controls)) {
      if (
        this.basicDetailsForm.get(key) &&
        this.basicDetailsForm.get(key)?.invalid
      ) {
        this.basicDetailsForm.markAllAsTouched();
        const invalidField = this.el.nativeElement.querySelector(
          `[formControlName=${key}]`
        );
        invalidField.focus();
        return;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    if (this.basicDetailsForm.valid) {
      return this.dialogRef.close({ ...this.basicDetailsForm.value });
    } else {
      this.focusError();
    }
  }

  openPathQuiz() {
    const dialogRef = this.dialog.open(UserSetupPathQuizComponent, {
      width: "50vw",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.pathForm.patchValue({
          pathCtrl: result,
        });
      }
    });
  }
}

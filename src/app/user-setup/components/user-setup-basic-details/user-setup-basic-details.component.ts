import {
  Component,
  OnInit,
  ElementRef,
  Inject,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { DEV_PATHS } from "src/app/shared/constants/dev-paths.constants";
import { COUNTRY_LIST } from "src/app/shared/constants/country-list";
import { UserSetupPathQuizComponent } from "../user-setup-path-quiz/user-setup-path-quiz.component";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "app-user-setup-basic-details",
  templateUrl: "./user-setup-basic-details.component.html",
  styleUrls: ["./user-setup-basic-details.component.scss"],
})
export class UserSetupBasicDetailsComponent implements OnInit {
  public countryList = COUNTRY_LIST;
  public paths = DEV_PATHS;

  public basicDetailsForm = new FormGroup({
    firstNameCtrl: new FormControl("", Validators.required),
    lastNameCtrl: new FormControl("", Validators.required),
    profileImageCtrl: new FormControl(""),
    locationCtrl: new FormControl("", Validators.required), // Add validator for country
    nationalityCtrl: new FormControl("", Validators.required), // Add validator for country
  });

  public pathForm = new FormGroup({
    pathCtrl: new FormControl("", Validators.required),
  });

  @ViewChild("firstName") firstNameCtrl: ElementRef;
  @ViewChild("lastName") lastNameCtrl: ElementRef;
  @ViewChild("profileImage") profileImageCtrl: ElementRef;
  @ViewChild("location") locationCtrl: ElementRef;
  @ViewChild("nationality") nationalityCtrl: ElementRef;

  @ViewChild("path") pathCtrl: ElementRef;
  @ViewChild("stepper") stepper: MatStepper;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<UserSetupBasicDetailsComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.basicDetailsForm.patchValue({
      profileImageCtrl: this.data.profileImage,
      firstNameCtrl: this.data.firstName,
      lastNameCtrl: this.data.lastName,
      locationCtrl: this.data.location,
      nationalityCtrl: this.data.nationality,
    });

    this.pathForm.patchValue({
      pathCtrl: this.data.path,
    });
  }

  ngAfterViewInit() {
    if (this.stepper.selectedIndex === 0 && this.basicDetailsForm.valid) {
      this.stepper.next();
      this.cdr.detectChanges();
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    if (this.basicDetailsForm.valid) {
      return this.dialogRef.close({ ...this.basicDetailsForm.value });
    }
  }

  onFormCompletion(actionType: "skip" | "tour") {
    if (this.basicDetailsForm.valid && this.pathForm.valid) {
      return this.dialogRef.close({
        action: actionType,
        data: {
          profileImage: this.basicDetailsForm.value.profileImageCtrl,
          firstName: this.basicDetailsForm.value.firstNameCtrl,
          lastName: this.basicDetailsForm.value.lastNameCtrl,
          location: this.basicDetailsForm.value.locationCtrl,
          nationality: this.basicDetailsForm.value.nationalityCtrl,
          path: this.pathForm.value.pathCtrl,
        },
      });
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

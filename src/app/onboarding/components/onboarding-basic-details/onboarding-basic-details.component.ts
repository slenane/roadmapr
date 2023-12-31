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
import {
  DEV_PATHS,
  IDeveloperPath,
} from "src/app/shared/constants/dev-paths.constants";
import { COUNTRY_LIST } from "src/app/shared/constants/country-list.constants";
import { OnboardingPathQuizComponent } from "../onboarding-path-quiz/onboarding-path-quiz.component";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "app-onboarding-basic-details",
  templateUrl: "./onboarding-basic-details.component.html",
  styleUrls: ["./onboarding-basic-details.component.scss"],
})
export class OnboardingBasicDetailsComponent implements OnInit {
  public COUNTRY_LIST = COUNTRY_LIST;
  public DEV_PATHS = DEV_PATHS;

  public basicDetailsForm = new FormGroup({
    firstNameCtrl: new FormControl("", Validators.required),
    lastNameCtrl: new FormControl("", Validators.required),
    locationCtrl: new FormControl("", Validators.required), // Add validator for country
    nationalityCtrl: new FormControl("", Validators.required), // Add validator for country
  });

  public pathForm = new FormGroup({
    pathCtrl: new FormControl<IDeveloperPath | string>("", Validators.required),
  });

  @ViewChild("firstName") firstNameCtrl: ElementRef;
  @ViewChild("lastName") lastNameCtrl: ElementRef;
  @ViewChild("location") locationCtrl: ElementRef;
  @ViewChild("nationality") nationalityCtrl: ElementRef;

  @ViewChild("path") pathCtrl: ElementRef;
  @ViewChild("stepper") stepper: MatStepper;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<OnboardingBasicDetailsComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.basicDetailsForm.patchValue({
      firstNameCtrl: this.data.firstName,
      lastNameCtrl: this.data.lastName,
      locationCtrl: this.data.location,
      nationalityCtrl: this.data.nationality,
    });

    console.log(this.data.path);
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

  onFormCompletion() {
    if (this.basicDetailsForm.valid && this.pathForm.valid) {
      return this.dialogRef.close({
        data: {
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
    const dialogRef = this.dialog.open(OnboardingPathQuizComponent, {
      panelClass: "modal-class",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const path = this.DEV_PATHS.find((path) => path.name === result);
        this.pathForm.patchValue({
          pathCtrl: path,
        });
      }
    });
  }

  compareValues(a: any, b: any): boolean {
    return a && b && a.id === b.id;
  }
}

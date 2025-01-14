import { BreakpointObserver } from "@angular/cdk/layout";
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";
import { MEDIA_QUERIES } from "src/app/shared/constants/breakpoints.constants";
import {
  dateRangeValidator,
  validEducationUrlValidator,
} from "src/app/shared/constants/validators.constants";

@Component({
  selector: "app-education-update",
  templateUrl: "./education-update.component.html",
  styleUrls: ["./education-update.component.scss"],
})
export class EducationUpdateComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public isMobileDevice = false;
  public updatingForm = false;
  public isUpdating: boolean = false;
  public selectedType: string = "";
  public educationForm = new FormGroup(
    {
      type: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(book|course)$/),
      ]),
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      author: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      startDate: new FormControl<Date | null>(new Date()),
      endDate: new FormControl<Date | null>(null),
      description: new FormControl(),
      link: new FormControl("", [
        Validators.required,
        validEducationUrlValidator,
      ]),
      isRecommended: new FormControl(true, [Validators.required]),
    },
    { validators: dateRangeValidator }
  );

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("type") type: ElementRef;
  @ViewChild("title") title: ElementRef;
  @ViewChild("author") author: ElementRef;
  @ViewChild("link") link: ElementRef;

  constructor(
    private el: ElementRef,
    public dialogRef: MatDialogRef<EducationUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.educationForm.valueChanges.subscribe(() => {
      if (!this.updatingForm) {
        this.updatingForm = true;

        if (this.educationForm.value.endDate) {
          this.setControlValidators("startDate", [Validators.required]);
        } else if (!this.educationForm.value.endDate) {
          this.clearControlValidators("startDate");
        }

        if (this.educationForm.errors?.dateRangeValidator) {
          this.educationForm.controls.endDate.setErrors({ invalidDate: true });
        } else {
          this.educationForm.controls.endDate.setErrors(null);
        }
      }

      this.updatingForm = false;
    });

    if (this.data?.type) {
      this.isUpdating = true;
      this.selectedType = this.data.type;
      this.educationForm.patchValue({
        title: this.data.title,
        author: this.data.author,
        link: this.data.link,
        description: this.data.description,
        endDate: this.data.endDate,
        startDate: this.data.startDate,
        type: this.data.type,
        isRecommended: this.data.isRecommended,
      });
    }
    this.educationForm.controls.type.valueChanges.subscribe(
      (type: any) => (this.selectedType = type)
    );

    this.breakpointObserver
      .observe(MEDIA_QUERIES.BREAKPOINTS)
      .subscribe((result) => {
        this.isMobileDevice = MEDIA_QUERIES.MOBILE.find(
          (size) => result.breakpoints[size]
        )
          ? true
          : false;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setControlValidators(controlName: string, validators: any[]) {
    const control = this.educationForm.get(controlName);

    if (control) {
      control.setValidators(validators);
      control.updateValueAndValidity(); // Update the validity status
    }
  }

  clearControlValidators(controlName: string) {
    const control = this.educationForm.get(controlName);

    if (control) {
      control.clearValidators();
      control.updateValueAndValidity(); // Update the validity status
    }
  }

  focusError() {
    for (const key of Object.keys(this.educationForm.controls)) {
      if (this.educationForm.get(key) && this.educationForm.get(key)?.invalid) {
        this.educationForm.markAllAsTouched();
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
    const stack = this.stack.getData() || [];

    if (
      this.educationForm.valid &&
      (this.educationForm.value.type === "book" || stack.length)
    ) {
      return this.dialogRef.close({ ...this.educationForm.value, stack });
    } else {
      this.focusError();
    }
  }
}

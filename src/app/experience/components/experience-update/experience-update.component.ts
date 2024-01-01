import { BreakpointObserver } from "@angular/cdk/layout";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";
import { MEDIA_QUERIES } from "src/app/shared/constants/breakpoints.constants";
import {
  dateRangeValidator,
  validLinkPattern,
} from "src/app/shared/constants/validators.constants";

@Component({
  selector: "app-experience-update",
  templateUrl: "./experience-update.component.html",
  styleUrls: ["./experience-update.component.scss"],
})
export class ExperienceUpdateComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public isMobileDevice = false;
  public updatingForm = false;
  public isUpdating: boolean = false;
  public experienceForm = new FormGroup(
    {
      role: new FormControl("", [Validators.required, Validators.minLength(3)]),
      company: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      companyLink: new FormControl("", [Validators.pattern(validLinkPattern)]),
      description: new FormControl(""),
      project: new FormControl("", [Validators.pattern(validLinkPattern)]),
      endDate: new FormControl(null),
      startDate: new FormControl(new Date(), [Validators.required]),
      type: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(freelance|professional)$/),
      ]),
    },
    { validators: dateRangeValidator }
  );

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("role") role: ElementRef;
  @ViewChild("company") company: ElementRef;
  @ViewChild("companyLink") companyLink: ElementRef;
  @ViewChild("type") type: ElementRef;

  constructor(
    private el: ElementRef,
    public dialogRef: MatDialogRef<ExperienceUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.experienceForm.valueChanges.subscribe(() => {
      if (!this.updatingForm) {
        this.updatingForm = true;

        if (this.experienceForm.errors?.dateRangeValidator) {
          this.experienceForm.controls.endDate.setErrors({ invalidDate: true });
        } else {
          this.experienceForm.controls.endDate.setErrors(null);
        }
      }

      this.updatingForm = false;
    });

    if (this.data) {
      this.isUpdating = true;
      this.experienceForm.patchValue({
        role: this.data.role,
        company: this.data.company,
        companyLink: this.data.companyLink,
        description: this.data.description,
        endDate: this.data.endDate,
        startDate: this.data.startDate,
        type: this.data.type,
      });
    }

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

  focusError() {
    for (const key of Object.keys(this.experienceForm.controls)) {
      if (
        this.experienceForm.get(key) &&
        this.experienceForm.get(key)?.invalid
      ) {
        this.experienceForm.markAllAsTouched();
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

    if (this.experienceForm.valid && stack.length) {
      return this.dialogRef.close({ ...this.experienceForm.value, stack });
    } else {
      this.focusError();
    }
  }
}

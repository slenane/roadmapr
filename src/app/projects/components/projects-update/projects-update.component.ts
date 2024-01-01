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
  selector: "app-project-update",
  templateUrl: "./projects-update.component.html",
  styleUrls: ["./projects-update.component.scss"],
})
export class ProjectsUpdateComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public isMobileDevice = false;
  public updatingForm = false;
  public isUpdating: boolean = false;
  public projectForm = new FormGroup(
    {
      description: new FormControl(""),
      github: new FormControl("", [Validators.pattern(validLinkPattern)]),
      endDate: new FormControl<Date | null>(null),
      link: new FormControl("", [Validators.pattern(validLinkPattern)]),
      notes: new FormControl(""),
      startDate: new FormControl<Date | null>(null),
      tagLine: new FormControl(""),
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      type: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(educational|personal)$/),
      ]),
    },
    { validators: dateRangeValidator }
  );

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("title") title: ElementRef;
  @ViewChild("type") type: ElementRef;

  constructor(
    private el: ElementRef,
    public dialogRef: MatDialogRef<ProjectsUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.projectForm.valueChanges.subscribe(() => {
      if (!this.updatingForm) {
        this.updatingForm = true;

        if (this.projectForm.value.endDate) {
          this.setControlValidators("startDate", [Validators.required]);
        } else if (!this.projectForm.value.endDate) {
          this.clearControlValidators("startDate");
        }

        if (this.projectForm.errors?.dateRangeValidator) {
          this.projectForm.controls.endDate.setErrors({ invalidDate: true });
        } else {
          this.projectForm.controls.endDate.setErrors(null);
        }
      }

      this.updatingForm = false;
    });

    if (this.data) {
      this.isUpdating = true;
      this.projectForm.patchValue({
        description: this.data.description,
        github: this.data.github,
        endDate: this.data.endDate,
        link: this.data.link,
        notes: this.data.notes,
        startDate: this.data.startDate,
        tagLine: this.data.tagLine,
        title: this.data.title,
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

  setControlValidators(controlName: string, validators: any[]) {
    const control = this.projectForm.get(controlName);

    if (control) {
      control.setValidators(validators);
      control.updateValueAndValidity(); // Update the validity status
    }
  }

  clearControlValidators(controlName: string) {
    const control = this.projectForm.get(controlName);

    if (control) {
      control.clearValidators();
      control.updateValueAndValidity(); // Update the validity status
    }
  }

  focusError() {
    for (const key of Object.keys(this.projectForm.controls)) {
      if (this.projectForm.get(key) && this.projectForm.get(key)?.invalid) {
        this.projectForm.markAllAsTouched();
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

    if (this.projectForm.valid && stack.length) {
      return this.dialogRef.close({ ...this.projectForm.value, stack });
    } else {
      this.focusError();
    }
  }
}

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
import { validLinkPattern } from "src/app/shared/constants/validators.constants";

@Component({
  selector: "app-employment-update",
  templateUrl: "./employment-update.component.html",
  styleUrls: ["./employment-update.component.scss"],
})
export class EmploymentUpdateComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public isUpdating: boolean = false;
  public employmentForm = new FormGroup({
    role: new FormControl("", [Validators.required, Validators.minLength(3)]),
    company: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    companyLink: new FormControl("", [Validators.pattern(validLinkPattern)]),
    description: new FormControl(""),
    project: new FormControl("", [Validators.pattern(validLinkPattern)]),
    endDate: new FormControl<Date | null>(null),
    startDate: new FormControl<Date | null>(null),
    type: new FormControl("", [
      Validators.required,
      Validators.pattern(/^(freelance|employment)$/),
    ]),
  });

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("role") role: ElementRef;
  @ViewChild("company") company: ElementRef;
  @ViewChild("companyLink") companyLink: ElementRef;
  @ViewChild("type") type: ElementRef;

  constructor(
    private el: ElementRef,
    public dialogRef: MatDialogRef<EmploymentUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.isUpdating = true;
      this.employmentForm.patchValue({
        role: this.data.role,
        company: this.data.company,
        companyLink: this.data.companyLink,
        description: this.data.description,
        endDate: this.data.endDate,
        startDate: this.data.startDate,
        type: this.data.type,
      });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  focusError() {
    for (const key of Object.keys(this.employmentForm.controls)) {
      if (
        this.employmentForm.get(key) &&
        this.employmentForm.get(key)?.invalid
      ) {
        this.employmentForm.markAllAsTouched();
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

    if (this.employmentForm.valid && stack.length) {
      return this.dialogRef.close({ ...this.employmentForm.value, stack });
    } else {
      this.focusError();
    }
  }
}

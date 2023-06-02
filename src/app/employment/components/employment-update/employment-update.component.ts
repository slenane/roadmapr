import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";

@Component({
  selector: "app-employment-update",
  templateUrl: "./employment-update.component.html",
  styleUrls: ["./employment-update.component.scss"],
})
export class EmploymentUpdateComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public employmentForm = new FormGroup({
    company: new FormControl("", Validators.required),
    companyLink: new FormControl("", Validators.required),
    description: new FormControl(""),
    endDate: new FormControl<Date | null>(null),
    role: new FormControl("", Validators.required),
    startDate: new FormControl<Date | null>(null),
    topics: new FormControl(""),
  });

  get topicsArray(): any {
    return this.employmentForm.get("topics");
  }

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("role") role: ElementRef;
  @ViewChild("company") company: ElementRef;
  @ViewChild("companyLink") companyLink: ElementRef;

  constructor(
    private el: ElementRef,
    public dialogRef: MatDialogRef<EmploymentUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.employmentForm.patchValue({
        company: this.data.company,
        companyLink: this.data.companyLink,
        description: this.data.description,
        endDate: this.data.endDate,
        startDate: this.data.startDate,
        role: this.data.role,
      });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  addTopic(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.topicsArray.setValue([...this.topicsArray.value, value.trim()]);
      this.topicsArray.updateValueAndValidity();
    }

    // Reset the input value
    if (input) input.value = "";
  }

  removeTopic(topic: any): void {
    const index = this.topicsArray.value.indexOf(topic);

    if (index >= 0) {
      this.topicsArray.value.splice(index, 1);
      this.topicsArray.updateValueAndValidity();
    }
  }

  focusError() {
    for (const key of Object.keys(this.employmentForm.controls)) {
      if (
        this.employmentForm.get(key) &&
        this.employmentForm.get(key)?.invalid
      ) {
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

    this.dialogRef.close({ ...this.employmentForm.value, stack });
  }
}

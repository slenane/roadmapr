import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { STATUS } from "src/app/education/constants/education.constants";
import { dateRangeValidator } from "src/app/shared/constants/validators.constants";

@Component({
  selector: "app-drop-list-date",
  templateUrl: "./drop-list-date.component.html",
  styleUrls: ["./drop-list-date.component.scss"],
})
export class DropListDateComponent implements OnInit {
  public showEndDate = false;
  public showStartDate = false;
  public invalidDates = false;

  public form = new FormGroup({
    endDate: new FormControl<Date | null>(null),
    startDate: new FormControl<Date | null>(null),
  });

  constructor(
    public dialogRef: MatDialogRef<DropListDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((form) => {
      if (this.form.errors) {
        this.invalidDates = true;
        this.form.setErrors({ invalidDates: true });
      } else {
        this.invalidDates = false;
      }

      console.log(this.invalidDates);
    });

    this.configureForm();
  }
  configureForm() {
    const startDateValue =
      this.data.container === STATUS.IN_PROGRESS
        ? new Date()
        : this.data.item.startDate || new Date();

    const endDateValue =
      this.data.container === STATUS.IN_PROGRESS ? null : new Date();

    this.showStartDate = true;
    this.showEndDate = this.data.container !== STATUS.IN_PROGRESS;

    this.form.patchValue({
      startDate: startDateValue,
      endDate: endDateValue,
    });

    this.setControlValidators("startDate", [Validators.required]);

    if (this.data.container !== STATUS.IN_PROGRESS) {
      this.setControlValidators("endDate", [Validators.required]);
      this.form.setValidators(dateRangeValidator);
    }
  }

  setControlValidators(controlName: string, validators: any[]) {
    const control = this.form.get(controlName);

    if (control) {
      control.setValidators(validators);
      control.updateValueAndValidity(); // Update the validity status
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    if (this.form.valid) {
      return this.dialogRef.close({
        end: this.form.value.endDate,
        start: this.form.value.startDate,
      });
    }
  }
}

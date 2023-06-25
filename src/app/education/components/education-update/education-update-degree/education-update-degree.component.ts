import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";

@Component({
  selector: "app-education-update-degree",
  templateUrl: "./education-update-degree.component.html",
  styleUrls: ["./education-update-degree.component.scss"],
})
export class EducationUpdateDegreeComponent implements OnInit {
  public degreeForm = new FormGroup({
    title: new FormControl("", Validators.required),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    description: new FormControl(""),
    link: new FormControl("", Validators.required),
    institution: new FormControl("", Validators.required),
  });

  @Input("data") data: any;

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("title") title: ElementRef;
  @ViewChild("link") link: ElementRef;
  @ViewChild("institution") institution: ElementRef;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.data) {
      this.degreeForm.patchValue({
        title: this.data.title,
        startDate: this.data.startData,
        endDate: this.data.endDate,
        description: this.data.description,
        link: this.data.link,
        institution: this.data.institution,
      });
    }
  }

  focusError() {
    for (const key of Object.keys(this.degreeForm.controls)) {
      if (this.degreeForm.get(key) && this.degreeForm.get(key)?.invalid) {
        const invalidField = this.el.nativeElement.querySelector(
          `[formControlName=${key}]`
        );
        invalidField.focus();
        return;
      }
    }
  }

  getData(): any {
    const stack = this.stack.getData() || [];

    if (this.degreeForm.valid && stack.length) {
      return { ...this.degreeForm.value, stack };
    } else {
      this.focusError();
    }
  }
}

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";

@Component({
  selector: "app-roadmap-update-degree",
  templateUrl: "./roadmap-update-degree.component.html",
  styleUrls: ["./roadmap-update-degree.component.scss"],
})
export class RoadmapUpdateDegreeComponent implements OnInit {
  public degreeForm = new FormGroup({
    title: new FormControl("", Validators.required),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    description: new FormControl("", Validators.required),
    topics: new FormControl("", Validators.required),
    link: new FormControl("", Validators.required),
    gpa: new FormControl("", Validators.required),
    institution: new FormControl("", Validators.required),
  });

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("title") title: ElementRef;
  @ViewChild("description") description: ElementRef;
  @ViewChild("topics") topics: ElementRef;
  @ViewChild("link") link: ElementRef;
  @ViewChild("gpa") gpa: ElementRef;
  @ViewChild("institution") institution: ElementRef;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

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

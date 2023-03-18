import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";

@Component({
  selector: "app-roadmap-update-course",
  templateUrl: "./roadmap-update-course.component.html",
  styleUrls: ["./roadmap-update-course.component.scss"],
})
export class RoadmapUpdateCourseComponent implements OnInit {
  public courseForm = new FormGroup({
    title: new FormControl("", Validators.required),
    instructor: new FormControl("", Validators.required),
    startDate: new FormControl<Date>(new Date(), Validators.required),
    endDate: new FormControl<Date>(new Date()),
    description: new FormControl("", Validators.required),
    topics: new FormControl("", Validators.required),
    link: new FormControl("", Validators.required),
    provider: new FormControl("", Validators.required),
  });

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("title") title: ElementRef;
  @ViewChild("instructor") instructor: ElementRef;
  @ViewChild("startDateInput") startDateInput: ElementRef;
  @ViewChild("description") description: ElementRef;
  @ViewChild("topics") topics: ElementRef;
  @ViewChild("link") link: ElementRef;
  @ViewChild("provider") provider: ElementRef;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  focusError() {
    for (const key of Object.keys(this.courseForm.controls)) {
      if (this.courseForm.get(key) && this.courseForm.get(key)?.invalid) {
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

    if (this.courseForm.valid && stack.length) {
      return { ...this.courseForm.value, stack };
    } else {
      this.focusError();
    }
  }
}

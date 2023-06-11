import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-roadmap-update-course",
  templateUrl: "./roadmap-update-course.component.html",
  styleUrls: ["./roadmap-update-course.component.scss"],
})
export class RoadmapUpdateCourseComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  public courseForm = new FormGroup({
    title: new FormControl("", Validators.required),
    instructor: new FormControl("", Validators.required),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    description: new FormControl(""),
    topics: new FormControl(""),
    link: new FormControl("", Validators.required),
  });

  get topicsArray(): any {
    return this.courseForm.get("topics");
  }

  @Input("data") data: any;

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("title") title: ElementRef;
  @ViewChild("instructor") instructor: ElementRef;
  @ViewChild("link") link: ElementRef;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.data) {
      this.courseForm.patchValue({
        title: this.data.title,
        instructor: this.data.instructor,
        startDate: this.data.startData,
        endDate: this.data.endDate,
        description: this.data.description,
        topics: this.data.topics,
        link: this.data.link,
      });
    }
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

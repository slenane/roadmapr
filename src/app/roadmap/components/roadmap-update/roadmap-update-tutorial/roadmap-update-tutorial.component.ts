import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-roadmap-update-tutorial",
  templateUrl: "./roadmap-update-tutorial.component.html",
  styleUrls: ["./roadmap-update-tutorial.component.scss"],
})
export class RoadmapUpdateTutorialComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  public tutorialForm = new FormGroup({
    title: new FormControl("", Validators.required),
    instructor: new FormControl("", Validators.required),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    description: new FormControl(""),
    topics: new FormControl([]),
    link: new FormControl("", Validators.required),
    github: new FormControl(""),
  });

  get topicsArray(): any {
    return this.tutorialForm.get("topics");
  }

  @Input("data") data: any;

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("title") title: ElementRef;
  @ViewChild("instructor") instructor: ElementRef;
  @ViewChild("link") link: ElementRef;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.data) {
      this.tutorialForm.patchValue({
        title: this.data.title,
        instructor: this.data.instructor,
        startDate: this.data.startData,
        endDate: this.data.endDate,
        description: this.data.description,
        topics: this.data.topics,
        link: this.data.link,
        github: this.data.github,
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
    for (const key of Object.keys(this.tutorialForm.controls)) {
      if (this.tutorialForm.get(key) && this.tutorialForm.get(key)?.invalid) {
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

    if (this.tutorialForm.valid && stack.length) {
      return { ...this.tutorialForm.value, stack };
    } else {
      this.focusError();
    }
  }
}

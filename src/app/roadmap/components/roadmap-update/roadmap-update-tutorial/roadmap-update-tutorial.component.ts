import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
    description: new FormControl("", Validators.required),
    topics: new FormControl([], Validators.required),
    link: new FormControl("", Validators.required),
    github: new FormControl("", Validators.required),
    provider: new FormControl("", Validators.required),
  });

  get topicsArray(): any {
    return this.tutorialForm.get("topics");
  }

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("title") title: ElementRef;
  @ViewChild("instructor") instructor: ElementRef;
  @ViewChild("description") description: ElementRef;
  @ViewChild("topics") topics: ElementRef;
  @ViewChild("link") link: ElementRef;
  @ViewChild("github") github: ElementRef;
  @ViewChild("provider") provider: ElementRef;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

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

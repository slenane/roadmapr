import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-roadmap-update-degree",
  templateUrl: "./roadmap-update-degree.component.html",
  styleUrls: ["./roadmap-update-degree.component.scss"],
})
export class RoadmapUpdateDegreeComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  public degreeForm = new FormGroup({
    title: new FormControl("", Validators.required),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    description: new FormControl(""),
    link: new FormControl("", Validators.required),
    topics: new FormControl(""),
    institution: new FormControl("", Validators.required),
  });

  get topicsArray(): any {
    return this.degreeForm.get("topics");
  }

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
        topics: this.data.modules,
        link: this.data.link,
        institution: this.data.institution,
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

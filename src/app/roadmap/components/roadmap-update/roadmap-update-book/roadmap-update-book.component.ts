import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-roadmap-update-book",
  templateUrl: "./roadmap-update-book.component.html",
  styleUrls: ["./roadmap-update-book.component.scss"],
})
export class RoadmapUpdateBookComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  public bookForm = new FormGroup({
    title: new FormControl("", Validators.required),
    author: new FormControl("", Validators.required),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    description: new FormControl("", Validators.required),
    topics: new FormControl("", Validators.required),
    link: new FormControl("", Validators.required),
    publisher: new FormControl("", Validators.required),
  });

  get topicsArray(): any {
    return this.bookForm.get("topics");
  }

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("title") title: ElementRef;
  @ViewChild("author") author: ElementRef;
  @ViewChild("description") description: ElementRef;
  @ViewChild("topics") topics: ElementRef;
  @ViewChild("link") link: ElementRef;
  @ViewChild("publisher") publisher: ElementRef;

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
    for (const key of Object.keys(this.bookForm.controls)) {
      if (this.bookForm.get(key) && this.bookForm.get(key)?.invalid) {
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

    if (this.bookForm.valid && stack.length) {
      return { ...this.bookForm.value, stack };
    } else {
      this.focusError();
    }
  }
}

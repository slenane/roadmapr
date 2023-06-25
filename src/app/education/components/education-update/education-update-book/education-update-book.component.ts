import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";

@Component({
  selector: "app-education-update-book",
  templateUrl: "./education-update-book.component.html",
  styleUrls: ["./education-update-book.component.scss"],
})
export class EducationUpdateBookComponent implements OnInit {
  public bookForm = new FormGroup({
    title: new FormControl("", Validators.required),
    author: new FormControl("", Validators.required),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    description: new FormControl(""),
    link: new FormControl("", Validators.required),
  });

  @Input("data") data: any;

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("title") title: ElementRef;
  @ViewChild("author") author: ElementRef;
  @ViewChild("link") link: ElementRef;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.data) {
      this.bookForm.patchValue({
        title: this.data.title,
        author: this.data.author,
        startDate: this.data.startData,
        endDate: this.data.endDate,
        description: this.data.description,
        link: this.data.link,
      });
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

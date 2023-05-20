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
    description: new FormControl("", Validators.required),
    modules: new FormControl("", Validators.required),
    link: new FormControl("", Validators.required),
    gpa: new FormControl("", Validators.required),
    institution: new FormControl("", Validators.required),
  });

  get modulesArray(): any {
    return this.degreeForm.get("modules");
  }

  @Input("data") data: any;

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("title") title: ElementRef;
  @ViewChild("description") description: ElementRef;
  @ViewChild("modules") modules: ElementRef;
  @ViewChild("link") link: ElementRef;
  @ViewChild("gpa") gpa: ElementRef;
  @ViewChild("institution") institution: ElementRef;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.data) {
      this.degreeForm.patchValue({
        title: this.data.title,
        startDate: this.data.startData,
        endDate: this.data.endDate,
        description: this.data.description,
        modules: this.data.modules,
        link: this.data.link,
        gpa: this.data.gpa,
        institution: this.data.institution,
      });
    }
  }

  addModule(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.modulesArray.setValue([...this.modulesArray.value, value.trim()]);
      this.modulesArray.updateValueAndValidity();
    }

    // Reset the input value
    if (input) input.value = "";
  }

  removeModule(module: any): void {
    const index = this.modulesArray.value.indexOf(module);

    if (index >= 0) {
      this.modulesArray.value.splice(index, 1);
      this.modulesArray.updateValueAndValidity();
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

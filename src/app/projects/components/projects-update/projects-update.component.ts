import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { MatChipInputEvent } from "@angular/material/chips";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";

@Component({
  selector: "app-project-update",
  templateUrl: "./projects-update.component.html",
  styleUrls: ["./projects-update.component.scss"],
})
export class ProjectsUpdateComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public projectForm = new FormGroup({
    description: new FormControl(""),
    github: new FormControl(""),
    endDate: new FormControl<Date | null>(null),
    link: new FormControl(""),
    notes: new FormControl(""),
    startDate: new FormControl<Date | null>(null),
    tagLine: new FormControl(""),
    title: new FormControl("", Validators.required),
    todo: new FormControl(""),
    topics: new FormControl(""),
  });

  get topicsArray(): any {
    return this.projectForm.get("topics");
  }

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("title") title: ElementRef;

  constructor(
    private el: ElementRef,
    public dialogRef: MatDialogRef<ProjectsUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.projectForm.patchValue({
        description: this.data.description,
        github: this.data.github,
        endDate: this.data.endDate,
        link: this.data.link,
        notes: this.data.notes,
        startDate: this.data.startDate,
        tagLine: this.data.tagLine,
        title: this.data.title,
        todo: this.data.todo,
        topics: this.data.topics,
      });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
    for (const key of Object.keys(this.projectForm.controls)) {
      if (this.projectForm.get(key) && this.projectForm.get(key)?.invalid) {
        const invalidField = this.el.nativeElement.querySelector(
          `[formControlName=${key}]`
        );
        invalidField.focus();
        return;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    const stack = this.stack.getData() || [];

    this.dialogRef.close({ ...this.projectForm.value, stack });
  }
}

import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";
import { validLinkPattern } from "src/app/shared/constants/validators.constants";

@Component({
  selector: "app-project-update",
  templateUrl: "./projects-update.component.html",
  styleUrls: ["./projects-update.component.scss"],
})
export class ProjectsUpdateComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public isUpdating: boolean = false;
  public projectForm = new FormGroup({
    description: new FormControl(""),
    github: new FormControl("", [Validators.pattern(validLinkPattern)]),
    endDate: new FormControl<Date | null>(null),
    link: new FormControl("", [Validators.pattern(validLinkPattern)]),
    notes: new FormControl(""),
    startDate: new FormControl<Date | null>(null),
    tagLine: new FormControl(""),
    title: new FormControl("", [Validators.required, Validators.minLength(3)]),
    type: new FormControl("", [
      Validators.required,
      Validators.pattern(/^(educational|personal)$/),
    ]),
  });

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("title") title: ElementRef;
  @ViewChild("type") type: ElementRef;

  constructor(
    private el: ElementRef,
    public dialogRef: MatDialogRef<ProjectsUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.isUpdating = true;
      this.projectForm.patchValue({
        description: this.data.description,
        github: this.data.github,
        endDate: this.data.endDate,
        link: this.data.link,
        notes: this.data.notes,
        startDate: this.data.startDate,
        tagLine: this.data.tagLine,
        title: this.data.title,
        type: this.data.type,
      });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  focusError() {
    for (const key of Object.keys(this.projectForm.controls)) {
      if (this.projectForm.get(key) && this.projectForm.get(key)?.invalid) {
        this.projectForm.markAllAsTouched();
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

    if (this.projectForm.valid && stack.length) {
      return this.dialogRef.close({ ...this.projectForm.value, stack });
    } else {
      this.focusError();
    }
  }
}

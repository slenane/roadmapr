import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EDUCATION_TYPES } from "../../constants/education.constants";
// import { EducationService } from "../../services/education.service";
// import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { StackSelectorComponent } from "src/app/shared/components/stack-selector/stack-selector.component";

@Component({
  selector: "app-education-update",
  templateUrl: "./education-update.component.html",
  styleUrls: ["./education-update.component.scss"],
})
export class EducationUpdateComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public educationTypes = EDUCATION_TYPES;
  public selectedType: string = "";
  public educationForm = new FormGroup({
    type: new FormControl("", Validators.required),
    title: new FormControl("", Validators.required),
    author: new FormControl("", Validators.required),
    startDate: new FormControl<Date | null>(new Date()),
    endDate: new FormControl<Date | null>(null),
    description: new FormControl(),
    link: new FormControl("", Validators.required),
    github: new FormControl(),
  });

  @ViewChild("stack") stack: StackSelectorComponent;
  @ViewChild("type") type: ElementRef;
  @ViewChild("title") title: ElementRef;
  @ViewChild("author") author: ElementRef;
  @ViewChild("link") link: ElementRef;

  constructor(
    // private educationService: EducationService,
    private el: ElementRef,
    public dialogRef: MatDialogRef<EducationUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data?.type) {
      this.selectedType = this.data.type;
      this.educationForm.patchValue({
        title: this.data.title,
        author: this.data.author,
        link: this.data.link,
        description: this.data.description,
        github: this.data.github,
        endDate: this.data.endDate,
        startDate: this.data.startDate,
        type: this.data.type,
      });
    }
    this.educationForm.controls.type.valueChanges.subscribe(
      (type: any) => (this.selectedType = type)
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // fetchDetails() {
  //   this.educationService
  //     .getItemDetailsFromLink(this.educationForm.value.link)
  //     .pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe((res: any) => {
  //       if (res.type) {
  //         this.selectedType = res.type;
  //         this.educationForm.patchValue({ type: res.type });
  //       }
  //       console.log(res.type);
  //       this.data = {
  //         ...this.data,
  //         ...res,
  //       };
  //       console.log(this.data);
  //     });
  // }

  focusError() {
    for (const key of Object.keys(this.educationForm.controls)) {
      if (this.educationForm.get(key) && this.educationForm.get(key)?.invalid) {
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

    if (this.educationForm.valid && stack.length) {
      return this.dialogRef.close({ ...this.educationForm.value, stack });
    } else {
      this.focusError();
    }
  }
}

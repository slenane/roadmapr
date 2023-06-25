import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EDUCATION_TYPES } from "../../constants/education.constants";
import { EducationUpdateBookComponent } from "./education-update-book/education-update-book.component";
import { EducationUpdateCourseComponent } from "./education-update-course/education-update-course.component";
import { EducationUpdateDegreeComponent } from "./education-update-degree/education-update-degree.component";
import { EducationUpdateTutorialComponent } from "./education-update-tutorial/education-update-tutorial.component";
// import { EducationService } from "../../services/education.service";
// import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

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
    type: new FormControl(),
    link: new FormControl(),
  });

  @ViewChild("book") book: EducationUpdateBookComponent;
  @ViewChild("course") course: EducationUpdateCourseComponent;
  @ViewChild("degree") degree: EducationUpdateDegreeComponent;
  @ViewChild("tutorial") tutorial: EducationUpdateTutorialComponent;

  constructor(
    // private educationService: EducationService,
    public dialogRef: MatDialogRef<EducationUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data?.type) {
      this.selectedType = this.data.type;
      this.educationForm.patchValue({ type: this.data.type });
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

  getFormData(): any {
    switch (this.selectedType) {
      case "book":
        return this.book.getData();
      case "course":
        return this.course.getData();
      case "degree":
        return this.degree.getData();
      case "tutorial":
        return this.tutorial.getData();
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    const data = {
      ...this.data,
      ...this.getFormData(),
      type: this.selectedType,
    };
    this.dialogRef.close(data);
  }
}

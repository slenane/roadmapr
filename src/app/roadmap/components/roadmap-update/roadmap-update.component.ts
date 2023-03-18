import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ROADMAP_TYPES } from "../../constants/roadmap.constants";
import { RoadmapUpdateBookComponent } from "./roadmap-update-book/roadmap-update-book.component";
import { RoadmapUpdateCourseComponent } from "./roadmap-update-course/roadmap-update-course.component";
import { RoadmapUpdateDegreeComponent } from "./roadmap-update-degree/roadmap-update-degree.component";
import { RoadmapUpdateTutorialComponent } from "./roadmap-update-tutorial/roadmap-update-tutorial.component";

@Component({
  selector: "app-roadmap-update",
  templateUrl: "./roadmap-update.component.html",
  styleUrls: ["./roadmap-update.component.scss"],
})
export class RoadmapUpdateComponent implements OnInit {
  public roadmapTypes = ROADMAP_TYPES;
  public selectedType: string = "";
  public roadmapForm = new FormGroup({
    type: new FormControl("", Validators.required),
  });

  @ViewChild("book") book: RoadmapUpdateBookComponent;
  @ViewChild("course") course: RoadmapUpdateCourseComponent;
  @ViewChild("degree") degree: RoadmapUpdateDegreeComponent;
  @ViewChild("tutorial") tutorial: RoadmapUpdateTutorialComponent;

  constructor(public dialogRef: MatDialogRef<RoadmapUpdateComponent>) {}

  ngOnInit(): void {
    this.roadmapForm.controls.type.valueChanges.subscribe(
      (type: any) => (this.selectedType = type)
    );
  }

  getFormData(): any {
    switch (this.selectedType) {
      case "book":
        return this.book.getData();
      case "course":
        return this.course.getData();
      case "degree":
        return this.degree.getData();
      // case 'tutorial': return this.tutorial.getData();
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    const data = { ...this.getFormData(), type: this.selectedType };
    console.log(data);
    return;
    this.dialogRef.close(true);
  }
}

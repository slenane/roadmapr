import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-experience-recommendation-details",
  templateUrl: "./experience-recommendation-details.component.html",
  styleUrls: ["./experience-recommendation-details.component.scss"],
})
export class ExperienceRecommendationDetailsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ExperienceRecommendationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

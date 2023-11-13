import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-education-recommendation-details",
  templateUrl: "./education-recommendation-details.component.html",
  styleUrls: ["./education-recommendation-details.component.scss"],
})
export class EducationRecommendationDetailsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EducationRecommendationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onAddToList(): void {
    this.dialogRef.close(this.data);
  }
}

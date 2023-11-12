import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-recommendation-details",
  templateUrl: "./recommendation-details.component.html",
  styleUrls: ["./recommendation-details.component.scss"],
})
export class RecommendationDetailsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RecommendationDetailsComponent>,
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

import { Component, OnInit, Inject, SimpleChanges } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { EmploymentStoreService } from "src/app/employment/services/employment-store.service";
import { EmploymentUpdateComponent } from "../../employment-update/employment-update.component";

@Component({
  selector: "app-employment-item-details",
  templateUrl: "./employment-item-details.component.html",
  styleUrls: ["./employment-item-details.component.scss"],
})
export class EmploymentItemDetailsComponent implements OnInit {
  constructor(
    private employmentStoreService: EmploymentStoreService,
    public dialogRef: MatDialogRef<EmploymentItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  editItem() {
    const dialogRef = this.dialog.open(EmploymentUpdateComponent, {
      width: "60vw",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.data = { ...this.data, ...result };
        this.employmentStoreService.updateEmploymentItem(this.data);
      }
    });
  }

  deleteItem() {
    this.employmentStoreService.removeEmploymentItem(this.data);
    this.dialogRef.close(false);
  }
}

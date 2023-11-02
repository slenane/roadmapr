import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { EducationUpdateComponent } from "../../education-update/education-update.component";
import { EducationStoreService } from "src/app/education/services/education-store.service";

@Component({
  selector: "app-education-item-details",
  templateUrl: "./education-item-details.component.html",
  styleUrls: ["./education-item-details.component.scss"],
})
export class EducationItemDetailsComponent implements OnInit {
  constructor(
    private educationStoreService: EducationStoreService,
    public dialogRef: MatDialogRef<EducationItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  editItem() {
    const dialogRef = this.dialog.open(EducationUpdateComponent, {
      minWidth: "70vw",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.data = { ...this.data, ...result };
        this.educationStoreService.updateEducationItem(this.data);
      }
    });
  }

  deleteItem() {
    this.educationStoreService.removeEducationItem(this.data);
    this.dialogRef.close(false);
  }

  getProviderClass() {
    return this.data.metadata?.provider ? this.data.metadata.provider : "";
  }
}

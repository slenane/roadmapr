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
  public providerType: string = "Provider";

  constructor(
    private educationStoreService: EducationStoreService,
    public dialogRef: MatDialogRef<EducationItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.data) {
      if (this.data.author) this.providerType = "Author";
      else if (this.data.institution) this.providerType = "Institution";
      else if (this.data.instructor) this.providerType = "Instructor";
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  editItem() {
    const dialogRef = this.dialog.open(EducationUpdateComponent, {
      width: "50vw",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.education) {
        this.data = result;
        this.educationStoreService.updateEducationItem(result);
      }
    });
  }

  deleteItem() {
    this.educationStoreService.removeEducationItem(this.data);
    this.dialogRef.close(false);
  }
}

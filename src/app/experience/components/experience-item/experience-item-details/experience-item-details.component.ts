import { Component, OnInit, Inject, SimpleChanges } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { ExperienceUpdateComponent } from "../../experience-update/experience-update.component";
import { ExperienceStoreService } from "src/app/experience/services/experience-store.service";

@Component({
  selector: "app-experience-item-details",
  templateUrl: "./experience-item-details.component.html",
  styleUrls: ["./experience-item-details.component.scss"],
})
export class ExperienceItemDetailsComponent implements OnInit {
  constructor(
    private experienceStoreService: ExperienceStoreService,
    public dialogRef: MatDialogRef<ExperienceItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  editItem() {
    const dialogRef = this.dialog.open(ExperienceUpdateComponent, {
      minWidth: "70vw",
      data: this.data,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.data = { ...this.data, ...result };
        this.experienceStoreService.updateExperienceItem(this.data);
      }
    });
  }

  deleteItem() {
    this.experienceStoreService.removeExperienceItem(this.data);
    this.dialogRef.close(false);
  }
}

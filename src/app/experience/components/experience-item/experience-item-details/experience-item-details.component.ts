import { Component, OnInit, Inject, SimpleChanges } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { ExperienceUpdateComponent } from "../../experience-update/experience-update.component";
import { ExperienceStoreService } from "src/app/experience/services/experience-store.service";
import { DropListService } from "src/app/shared/services/drop-list.service";

@Component({
  selector: "app-experience-item-details",
  templateUrl: "./experience-item-details.component.html",
  styleUrls: ["./experience-item-details.component.scss"],
})
export class ExperienceItemDetailsComponent implements OnInit {
  public item: any;

  constructor(
    private experienceStoreService: ExperienceStoreService,
    private dropListService: DropListService,
    public dialogRef: MatDialogRef<ExperienceItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.item = this.data.item;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  editItem() {
    const dialogRef = this.dialog.open(ExperienceUpdateComponent, {
      panelClass: "modal-class",
      data: this.item,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.item = { ...this.item, ...result };
        this.item = this.dropListService.getItemListAndPosition(
          this.item,
          this.data.listsLastIndex
        );
        this.experienceStoreService.updateExperienceItem(this.item);
      }
    });
  }

  deleteItem() {
    this.experienceStoreService.removeExperienceItem(this.item);
    this.dialogRef.close(false);
  }
}

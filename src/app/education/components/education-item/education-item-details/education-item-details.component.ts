import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { EducationUpdateComponent } from "../../education-update/education-update.component";
import { EducationStoreService } from "src/app/education/services/education-store.service";
import { DropListService } from "src/app/shared/services/drop-list.service";

@Component({
  selector: "app-education-item-details",
  templateUrl: "./education-item-details.component.html",
  styleUrls: ["./education-item-details.component.scss"],
})
export class EducationItemDetailsComponent implements OnInit {
  public item: any;

  constructor(
    private educationStoreService: EducationStoreService,
    private dropListService: DropListService,
    public dialogRef: MatDialogRef<EducationItemDetailsComponent>,
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
    const dialogRef = this.dialog.open(EducationUpdateComponent, {
      panelClass: "modal-edit-class",
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
        this.educationStoreService.updateEducationItem(this.item);
      }
    });
  }

  deleteItem() {
    this.educationStoreService.removeEducationItem(this.item);
    this.dialogRef.close(false);
  }
}

import { Component, OnInit, Inject, SimpleChanges } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { RoadmapUpdateComponent } from "../../roadmap-update/roadmap-update.component";
import { RoadmapStoreService } from "src/app/roadmap/services/roadmap-store.service";

@Component({
  selector: "app-roadmap-item-details",
  templateUrl: "./roadmap-item-details.component.html",
  styleUrls: ["./roadmap-item-details.component.scss"],
})
export class RoadmapItemDetailsComponent implements OnInit {
  constructor(
    private roadmapStoreService: RoadmapStoreService,
    public dialogRef: MatDialogRef<RoadmapItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  editItem() {
    const dialogRef = this.dialog.open(RoadmapUpdateComponent, {
      width: "60vw",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.roadmap) {
        this.data = result;
        this.roadmapStoreService.updateRoadmapItem(result);
      }
    });
  }

  deleteItem() {}

  // onSave(): void {
  //   this.dialogRef.close(this.data);
  // }
}

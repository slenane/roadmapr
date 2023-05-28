import { Component, OnInit, Inject, SimpleChanges } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
// import { RoadmapUpdateComponent } from "../../roadmap-update/roadmap-update.component";
import { ProjectStoreService } from "src/app/project/services/project-store.service";
import { ProjectUpdateComponent } from "../../update-project/project-update.component";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"],
})
export class ProjectDetailsComponent implements OnInit {
  constructor(
    private projectStoreService: ProjectStoreService,
    public dialogRef: MatDialogRef<ProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  editItem() {
    const dialogRef = this.dialog.open(ProjectUpdateComponent, {
      width: "60vw",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.roadmap) {
        this.data = result;
        this.projectStoreService.updateProject(result);
      }
    });
  }

  deleteItem() {
    this.projectStoreService.removeProject(this.data);
    this.dialogRef.close(false);
  }
}

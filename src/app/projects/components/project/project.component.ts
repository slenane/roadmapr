import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ProjectDetailsComponent } from "./project-details/project-details.component";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit {
  @Input() data: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openItemDetails() {
    this.dialog.open(ProjectDetailsComponent, {
      width: "60vw",
      data: this.data,
    });
  }
}

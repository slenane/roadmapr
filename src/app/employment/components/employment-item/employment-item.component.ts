import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EmploymentItemDetailsComponent } from "./employment-item-details/employment-item-details.component";

@Component({
  selector: "app-employment-item",
  templateUrl: "./employment-item.component.html",
  styleUrls: ["./employment-item.component.scss"],
})
export class EmploymentItemComponent implements OnInit {
  @Input() data: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openItemDetails() {
    this.dialog.open(EmploymentItemDetailsComponent, {
      width: "60vw",
      data: this.data,
    });
  }
}

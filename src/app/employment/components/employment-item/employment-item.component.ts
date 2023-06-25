import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EmploymentStoreService } from "../../services/employment-store.service";
import { EmploymentItemDetailsComponent } from "./employment-item-details/employment-item-details.component";

@Component({
  selector: "app-employment-item",
  templateUrl: "./employment-item.component.html",
  styleUrls: ["./employment-item.component.scss"],
})
export class EmploymentItemComponent implements OnInit, OnChanges {
  @Input() selectedView: any;
  @Input() data: any;

  constructor(
    public dialog: MatDialog,
    private employmentStoreService: EmploymentStoreService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.selectedView.currentValue &&
      changes.selectedView.currentValue != changes.selectedView.previousValue
    ) {
      this.selectedView = changes.selectedView.currentValue;
    }
  }

  openItemDetails() {
    this.dialog.open(EmploymentItemDetailsComponent, {
      width: "50vw",
      data: this.data,
    });
  }
}

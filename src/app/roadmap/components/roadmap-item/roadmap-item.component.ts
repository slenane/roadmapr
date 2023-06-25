import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { RoadmapItemDetailsComponent } from "./roadmap-item-details/roadmap-item-details.component";

@Component({
  selector: "app-roadmap-item",
  templateUrl: "./roadmap-item.component.html",
  styleUrls: ["./roadmap-item.component.scss"],
})
export class RoadmapItemComponent implements OnInit, OnChanges {
  @Input() selectedView: any;
  @Input() data: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.selectedView &&
      changes.selectedView.currentValue != changes.selectedView.previousValue
    ) {
      this.selectedView = changes.selectedView.currentValue;
    }
  }

  removeRecommendation(item: any) {
    console.log(item);
  }

  openItemDetails() {
    this.dialog.open(RoadmapItemDetailsComponent, {
      width: "50vw",
      data: this.data,
    });
  }
}

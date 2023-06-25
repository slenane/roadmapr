import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EducationItemDetailsComponent } from "./education-item-details/education-item-details.component";

@Component({
  selector: "app-education-item",
  templateUrl: "./education-item.component.html",
  styleUrls: ["./education-item.component.scss"],
})
export class EducationItemComponent implements OnInit, OnChanges {
  public sortedStack: any[] = [];
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
    if (
      changes.data &&
      changes.data.currentValue != changes.data.previousValue
    ) {
      if (this.data.stack) {
        this.sortedStack = this.sortStack([...this.data.stack]);
      }
    }
  }

  sortStack(stack: any) {
    return stack.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  removeRecommendation(item: any) {
    console.log(item);
  }

  openItemDetails() {
    this.dialog.open(EducationItemDetailsComponent, {
      width: "50vw",
      data: { ...this.data, stack: this.sortedStack },
    });
  }
}

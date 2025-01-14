import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
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
  public pinDisplayed: boolean = false;
  public isPinned: boolean = false;

  @Input() selectedView: any;
  @Input() data: any;
  @Input() listsLastIndex: { todo: number; inProgress: number; done: number };
  @Output() pinItem: EventEmitter<any> = new EventEmitter();

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
      if (this.data?.pinned) this.isPinned = true;
    }

    console.log(this.data, this.sortedStack);
  }

  sortStack(stack: any) {
    return stack.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  openItemDetails() {
    this.dialog.open(EducationItemDetailsComponent, {
      data: {
        item: {
          ...this.data,
          stack: this.sortedStack,
        },
        listsLastIndex: this.listsLastIndex,
      },
      panelClass: "modal-class",
      autoFocus: false,
    });
  }

  showPin() {
    this.pinDisplayed = true;
  }

  hidePin() {
    this.pinDisplayed = false;
  }

  togglePin(event: Event) {
    event.stopPropagation();
    this.isPinned = !this.isPinned;
    this.pinItem.emit(this.data);
  }

  getProviderClass() {
    return this.data.metadata?.provider ? this.data.metadata.provider : "";
  }
}

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
import { ProjectDetailsComponent } from "./project-details/project-details.component";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit, OnChanges {
  public sortedStack: any[] = [];
  public pinDisplayed: boolean = false;
  public isPinned: boolean = false;

  @Input() selectedView: any;
  @Input() data: any;
  @Input() listsLastIndex: { inProgress: number; done: number };
  @Output() pinItem: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.selectedView.currentValue &&
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
  }

  sortStack(stack: any) {
    return stack.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  openItemDetails() {
    this.dialog.open(ProjectDetailsComponent, {
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
}

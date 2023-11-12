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
// import { ExperienceStoreService } from "../../services/experience-store.service";
import { ExperienceItemDetailsComponent } from "./experience-item-details/experience-item-details.component";

@Component({
  selector: "app-experience-item",
  templateUrl: "./experience-item.component.html",
  styleUrls: ["./experience-item.component.scss"],
})
export class ExperienceItemComponent implements OnInit, OnChanges {
  public sortedStack: any[] = [];
  public pinDisplayed: boolean = false;
  public isPinned: boolean = false;

  @Input() selectedView: any;
  @Input() data: any;
  @Output() pinItem: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog // private experienceStoreService: ExperienceStoreService
  ) {}

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
    this.dialog.open(ExperienceItemDetailsComponent, {
      width: "50vw",
      data: { ...this.data, stack: this.sortedStack },
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

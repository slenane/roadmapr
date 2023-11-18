import {
  Component,
  OnChanges,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { RoadmapUpdateComponent } from "../roadmap-update/roadmap-update.component";

@Component({
  selector: "app-roadmap-filters",
  templateUrl: "./roadmap-filters.component.html",
  styleUrls: ["./roadmap-filters.component.scss"],
})
export class RoadmapFiltersComponent implements OnInit, OnChanges {
  public sortedStack: any[] = [];
  public selectedView: "compact" | "expanded" = "compact";
  public selectedLanguage: any = null;
  public timeConfig = [
    { title: "3 Months", name: "three" },
    { title: "6 Months", name: "six" },
    { title: "1 Year", name: "year" },
  ];
  public selectedPeriod: any;

  @Input() languageConfig: any[] = [];
  @Output() onFilterLanguage: EventEmitter<null | string> = new EventEmitter();
  @Output() onFilterPeriod: EventEmitter<null | string> = new EventEmitter();
  @Output() onUpdate = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.languageConfig &&
      changes.languageConfig.currentValue !=
        changes.languageConfig.previousValue
    ) {
      if (this.languageConfig) {
        this.sortedStack = this.sortStack([...this.languageConfig]);
      }
    }
  }

  sortStack(stack: any) {
    return stack.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  filterLanguage($event: any, language: string) {
    $event.stopPropagation();

    if (this.selectedLanguage === language) {
      this.onFilterLanguage.emit(null);
      this.selectedLanguage = null;
    } else {
      this.onFilterLanguage.emit(language);
      this.selectedLanguage = language;
    }
  }

  filterPeriod($event: any) {
    if (this.selectedPeriod === $event) {
      this.onFilterPeriod.emit(null);
      this.selectedPeriod = null;
    } else {
      this.onFilterPeriod.emit($event);
      this.selectedPeriod = $event;
    }
  }

  editRoadmap() {
    const dialogRef = this.dialog.open(RoadmapUpdateComponent, {
      minWidth: "70vw",
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.onUpdate.emit(result);
    });
  }
}

import {
  Component,
  OnChanges,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-roadmap-filters",
  templateUrl: "./roadmap-filters.component.html",
  styleUrls: ["./roadmap-filters.component.scss"],
})
export class RoadmapFiltersComponent implements OnInit, OnChanges {
  public showAllFilters: boolean = false;
  public sortedStack: any[] = [];
  public selectedView: "compact" | "expanded" = "compact";
  public selectedLanguage: any = null;
  public selectedType: null | "frontend" | "backend" = null;
  public typeConfig = [
    { title: "Backend", name: "backend" },
    { title: "Frontend", name: "frontend" },
  ];
  public statusConfig = [
    { title: "In Progress", name: "progress" },
    { title: "Completed", name: "completed" },
  ];
  public timeConfig = [
    { title: "1 Month", name: "month" },
    { title: "3 Months", name: "three" },
    { title: "6 Months", name: "six" },
    { title: "1 Year", name: "year" },
  ];
  public selectedStatus: any;
  public selectedPeriod: any;

  // @Input() typeConfig: any[];
  @Input() languageConfig: any[] = [];
  @Output() onFilterType: EventEmitter<null | string> = new EventEmitter();
  @Output() onFilterLanguage: EventEmitter<null | string> = new EventEmitter();
  @Output() onFilterStatus: EventEmitter<null | string> = new EventEmitter();
  @Output() onFilterPeriod: EventEmitter<null | string> = new EventEmitter();

  constructor() {}

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

  filterType($event: any) {
    if (this.selectedType === $event) {
      this.onFilterType.emit(null);
      this.selectedType = null;
    } else {
      this.onFilterType.emit($event);
      this.selectedType = $event;
    }
  }

  filterLanguage($event: any, language: string) {
    console.log($event);
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

  filterStatus($event: any) {
    if (this.selectedStatus === $event) {
      this.onFilterStatus.emit(null);
      this.selectedStatus = null;
    } else {
      this.onFilterStatus.emit($event);
      this.selectedStatus = $event;
    }
  }
}

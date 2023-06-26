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
  selector: "app-dashboard-filters",
  templateUrl: "./dashboard-filters.component.html",
  styleUrls: ["./dashboard-filters.component.scss"],
})
export class DashboardFiltersComponent implements OnInit, OnChanges {
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
    { title: "Last Month", name: "month" },
    { title: "Last 3 Month", name: "three" },
    { title: "Last 6 Month", name: "six" },
    { title: "Last Year", name: "year" },
  ];
  public selectedStatus: any;
  public selectedPeriod: any;

  // @Input() typeConfig: any[];
  @Input() languageConfig: any[];
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

  filterLanguage($event: any) {
    if (this.selectedLanguage === $event) {
      this.onFilterLanguage.emit(null);
      this.selectedLanguage = null;
    } else {
      this.onFilterLanguage.emit($event);
      this.selectedLanguage = $event;
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

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EmploymentUpdateComponent } from "src/app/employment/components/employment-update/employment-update.component";
import { ProjectsUpdateComponent } from "src/app/projects/components/projects-update/projects-update.component";
import { EducationUpdateComponent } from "src/app/education/components/education-update/education-update.component";

@Component({
  selector: "app-drop-list-filters",
  templateUrl: "./drop-list-filters.component.html",
  styleUrls: ["./drop-list-filters.component.scss"],
})
export class DropListFiltersComponent implements OnInit, OnChanges {
  public sortedStack: any[] = [];
  public selectedLanguage: any = null;
  public selectedType: null | "book" | "course" = null;

  @Input() type: "employment" | "education" | "projects";
  @Input() parentId: string;
  @Input() typeConfig: any[];
  @Input() selectedView: "compact" | "expanded";
  @Input() languageConfig: any[];
  @Output() onFilterType: EventEmitter<null | string> = new EventEmitter();
  @Output() onFilterLanguage: EventEmitter<null | string> = new EventEmitter();
  @Output() onUpdateView: EventEmitter<any> = new EventEmitter();
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();

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

  addItem(): void {
    let dialogRef;

    if (this.type === "employment")
      dialogRef = this.dialog.open(EmploymentUpdateComponent, {
        minWidth: "70vw",
      });
    else if (this.type === "education")
      dialogRef = this.dialog.open(EducationUpdateComponent, {
        minWidth: "70vw",
      });
    else
      dialogRef = this.dialog.open(ProjectsUpdateComponent, {
        minWidth: "70vw",
      });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.onUpdate.emit({ id: this.parentId, data: result });
    });
  }

  clearFilters() {
    this.onFilterLanguage.emit(null);
    this.selectedLanguage = null;
    this.onFilterType.emit(null);
    this.selectedType = null;
  }
}
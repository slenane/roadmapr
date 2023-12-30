import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Projects } from "../store/projects.models";
import { ProjectsService } from "../services/projects.service";
import { ProjectsStoreService } from "../services/projects-store.service";
import { PROJECT_TYPE_CONFIG, STATUS } from "../constants/projects.constants";
import { DropListService } from "src/app/shared/services/drop-list.service";
import { projectsInitialState } from "../store/projects.reducer";
import { MatDialog } from "@angular/material/dialog";
import { DropListDateComponent } from "src/app/shared/components/drop-list/drop-list-date/drop-list-date.component";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public selectedFilterType: null | string = null;
  public selectedFilterLanguage: null | string = null;
  public selectedView: "compact" | "expanded" = "compact";
  public typeConfig = PROJECT_TYPE_CONFIG;
  public projects: Projects;
  public projectsId: string;
  public projectsArray: any[] = [];
  public listsLastIndex: { todo: number; inProgress: number; done: number } = {
    todo: 0,
    inProgress: 0,
    done: 0,
  };

  public languageFilterData: any = [];

  public todo: any[];
  public inProgress: any[];
  public done: any[];

  constructor(
    private projectService: ProjectsService,
    private projectsStoreService: ProjectsStoreService,
    private dropListService: DropListService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectsStoreService
      .getProjects(this.projectsId ? this.projectsId : "")
      .pipe(
        filter((state) => state != projectsInitialState),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((projects: Projects) => {
        this.projects = projects;
        this.projectsArray = this.projects.projectList;
        this.getProjectsConfig(this.projectsArray);
        this.getLanguageFilterData();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getProjectsConfig(projects: any[]): void {
    const todoArray: any[] = [],
      inProgressArray: any[] = [],
      doneArray: any[] = [];

    projects.forEach((item) => {
      if (item.status === STATUS.IN_PROGRESS) inProgressArray.push(item);
      else if (item.status === STATUS.DONE) doneArray.push(item);
      else todoArray.push(item);
    });

    this.todo = this.sortItems(todoArray);
    this.inProgress = this.sortItems(inProgressArray);
    this.done = this.sortItems(doneArray);

    this.listsLastIndex = {
      todo: this.todo.length,
      inProgress: this.inProgress.length,
      done: this.done.length,
    };
  }

  sortItems(arr: any[]): any[] {
    return arr.sort((a: any, b: any): number => {
      if (a.position < b.position) return -1;
      else if (a.position > b.position) return 1;
      else return 0;
    });
  }

  getLanguageFilterData() {
    const projects: any[] = this.projectsArray;
    const languageData: any[] = [];
    const languages: any[] = [];

    projects.forEach((item) => {
      item.stack.forEach((language: any) => {
        if (!languageData[language.name]) {
          languageData[language.name] = {
            count: 0,
          };
          languages.push(language);
        }
        languageData[language.name].count++;
      });
    });

    const sortable = [];

    for (let item in languageData) {
      sortable.push([item, languageData[item].count]);
    }

    this.languageFilterData = [
      ...[...sortable.sort((a, b) => b[1] - a[1]).splice(0, 20)].map((item) => {
        return languages.find((language) => language.name === item[0]);
      }),
    ];
  }

  filterByType($event: null | string) {
    this.selectedFilterType = $event;
  }

  filterByLanguage($event: null | string) {
    this.selectedFilterLanguage = $event;
  }

  updateView($event: any) {
    this.selectedView = $event;
  }

  matchesFilters(data: any) {
    return (
      (this.selectedFilterType === null ||
        this.selectedFilterType === data.type) &&
      (this.selectedFilterLanguage === null ||
        data.stack.find(
          (item: any) => item.name === this.selectedFilterLanguage
        ))
    );
  }

  createProject(item: any) {
    if (item.data) {
      let newItem = { ...item.data };
      newItem.pinned = false;

      newItem = this.dropListService.getItemListAndPosition(
        newItem,
        this.listsLastIndex
      );
      this.projectsStoreService.createProject(item.id, item.data);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    const currentContainer = event.container;
    const previousContainer = event.previousContainer;
    const previousIndex = event.previousIndex;

    const handleUpdate = (result?: {
      end?: Date | null;
      start?: Date | null;
    }) => {
      const updatedItems = this.dropListService.drop(event, result);

      if (updatedItems.length) {
        this.projectsStoreService.bulkUpdateProjectItems(
          this.projects._id,
          updatedItems
        );
      }
    };

    if (previousContainer !== currentContainer) {
      const droppedItem = previousContainer.data[previousIndex];

      if (currentContainer.id === STATUS.TODO) {
        handleUpdate({ end: null, start: null });
      } else if (
        currentContainer.id === STATUS.IN_PROGRESS &&
        droppedItem.startDate
      ) {
        handleUpdate({ end: null });
      } else {
        this.dialog
          .open(DropListDateComponent, {
            minWidth: "40vw",
            disableClose: true,
            data: {
              item: droppedItem,
              container: currentContainer.id,
            },
          })
          .afterClosed()
          .subscribe((result: any) => {
            if (result) handleUpdate(result);
            else return;
          });
      }
    } else {
      handleUpdate();
    }
  }

  onPinToggle(data: any, itemList: any[]) {
    const updatedItems = this.dropListService.onPinToggle(itemList, data);

    if (updatedItems) {
      this.projectsStoreService.bulkUpdateProjectItems(
        this.projects._id,
        updatedItems
      );
    }
  }
}

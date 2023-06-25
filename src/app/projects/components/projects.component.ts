import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Projects } from "../store/projects.models";
import { ProjectsService } from "../services/projects.service";
import { ProjectsStoreService } from "../services/projects-store.service";
import { MatDialog } from "@angular/material/dialog";

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
  public typeConfig = [
    { title: "Personal", name: "personal" },
    { title: "Educational", name: "educational" },
  ];
  public filterType = "date";
  public projects: Projects;
  public projectsId: string;

  public languageFilterData: any = [];

  public todoArray: any[];
  public inProgressArray: any[];
  public doneArray: any[];

  constructor(
    private projectService: ProjectsService,
    private projectsStoreService: ProjectsStoreService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectsStoreService
      .getProjects(this.projectsId ? this.projectsId : "")
      .pipe(
        filter((state) => state != null),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((projects: Projects) => {
        this.projects = projects;
        if (this.projects.projectList.length) {
          this.getProjectsConfig();
          this.getLanguageFilterData();
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getProjectsConfig(): void {
    const projects = this.generateProjects(
      this.projects.projectList,
      this.filterType
    );
    this.todoArray = projects.filter(
      (item: any) => !item.startDate && !item.endDate
    );
    this.inProgressArray = projects.filter(
      (item: any) => item.startDate && !item.endDate
    );
    this.doneArray = projects.filter((item: any) => item.endDate);
  }

  generateProjects(projects: any, filter: string): any {
    switch (filter) {
      case "date":
        return projects;
    }
  }

  getLanguageFilterData() {
    const projects: any[] = this.generateProjects(
      this.projects.projectList,
      this.filterType
    );
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
      this.projectsStoreService.createProject(item.id, item.data);
    }
  }

  transferProject(item: any) {
    this.projectService
      .updateProject(this.projects._id, item)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  transferItem(event: CdkDragDrop<any[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const item = { ...event.previousContainer.data[event.previousIndex] };
      if (event.container.id === "cdk-drop-list-0") {
        if (item.startDate) item.startDate = null;
        if (item.endDate) item.endDate = null;
      }
      if (event.container.id === "cdk-drop-list-1") {
        if (item.endDate) item.endDate = null;
        if (!item.startDate) item.startDate = new Date();
      }
      if (event.container.id === "cdk-drop-list-2") {
        if (!item.startDate) item.startDate = new Date();
        item.endDate = new Date();
      }
      this.transferProject(item);
      this.transferItem(event);
    }
  }
}

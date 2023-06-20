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
// import { DUMMY_PROJECTS } from "../constants/dummy.constants";
import { MatDialog } from "@angular/material/dialog";
import { ProjectsUpdateComponent } from "./projects-update/projects-update.component";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public selectedFilter: null | string = null;
  public selectedView: "dense" | "sparse" = "dense";
  public filterType = "date";
  public projects: Projects;
  public projectsId: string;

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
        if (this.projects.projectList.length) this.getProjectsConfig();
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

  filterProjects($event: null | string) {
    this.selectedFilter = $event;
  }

  updateView($event: any) {
    this.selectedView = $event;
  }

  addProject(item: any) {
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

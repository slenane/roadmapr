import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { User } from "src/app/core/store/auth.models";
import { Project, Projects } from "../store/project.models";
import { ProjectService } from "../services/project.service";
import { ProjectStoreService } from "../services/project-store.service";
import { Store } from "@ngrx/store";
import { Profile } from "src/app/profile/store/profile.models";
import * as profileSelectors from "src/app/profile/store/profile.selectors";
import { DUMMY_PROJECTS } from "../constants/dummy.constants";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public todoArray: any[];
  public inProgressArray: any[];
  public doneArray: any[];
  public filterType = "date";
  public user: User | null;
  public projects: Projects;
  public projectId: string;

  constructor(
    private projectService: ProjectService,
    private projectStoreService: ProjectStoreService,
    private store: Store<Profile>
  ) {}

  ngOnInit(): void {
    this.projects = DUMMY_PROJECTS;
    this.getProjectsConfig();

    // this.store
    //   .select(profileSelectors.getProfile)
    //   .pipe(filter((data) => !!data))
    //   .subscribe((user) => {
    //     this.projectId = user.project?._id || "6434207863105b3b3fe7cd8e";

    //     this.projectStoreService
    //       .getProjects(this.projectId)
    //       .pipe(
    //         filter((state) => state != null),
    //         takeUntil(this.ngUnsubscribe)
    //       )
    //       .subscribe((projects: Project[]) => {
    //         this.projects = projects;
    //         this.getProjectsConfig();
    //       });
    //   });
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

  createProject(item: any) {
    if (item.data) {
      this.projectStoreService.createProject(item.id, item.data);
    }
  }

  transferProject(item: any) {
    this.projectService
      .updateProject(this.projectId, item)
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

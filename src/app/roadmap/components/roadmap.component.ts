import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { User } from "src/app/core/store/auth.models";
import { Roadmap } from "../store/roadmap.models";
import { DUMMY_ROADMAP } from "../constants/dummy.constants";
import { RoadmapService } from "../services/roadmap.service";
import { RoadmapStoreService } from "../services/roadmap-store.service";

@Component({
  selector: "app-roadmap",
  templateUrl: "./roadmap.component.html",
  styleUrls: ["./roadmap.component.scss"],
})
export class RoadmapComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public todoArray: any[];
  public inProgressArray: any[];
  public doneArray: any[];
  public recommendationsArray: any[];
  public selectedFilter: null | string = null;
  public filterType = "date";
  public user: User | null;
  public roadmap: Roadmap;
  public roadmapId: string = "6434207863105b3b3fe7cd8e";
  public recommendations = DUMMY_ROADMAP;

  constructor(
    private roadmapService: RoadmapService,
    private roadmapStoreService: RoadmapStoreService
  ) {}

  ngOnInit(): void {
    this.roadmapStoreService
      .getRoadmap(this.roadmapId)
      .pipe(filter((state) => state != null))
      .subscribe((roadmap: Roadmap) => {
        this.roadmap = roadmap;
        this.getRoadmapConfig();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getRoadmapConfig(): void {
    const roadmap = this.generateRoadmap(this.roadmap, this.filterType);
    this.todoArray = roadmap.filter((item: any) => !item.startDate);
    this.inProgressArray = roadmap.filter(
      (item: any) => item.startDate && !item.endDate
    );
    this.doneArray = roadmap.filter((item: any) => item.endDate);
    this.recommendationsArray = this.generateRoadmap(
      this.recommendations,
      this.filterType
    );
  }

  generateRoadmap(roadmap: any, filter: string): any {
    switch (filter) {
      case "date":
        return this.sortByDate(roadmap);
    }
  }

  sortByDate(roadmap: any): any[] {
    const items: any[] = [];
    const categories = ["books", "courses", "degrees", "tutorials"];

    for (const category of categories) {
      if (roadmap[category]) {
        roadmap[category].forEach((item: any) => items.push(item));
      }
    }

    return items;
  }

  filterRoadmap($event: null | string) {
    this.selectedFilter = $event;
  }

  createRoadmapItem(item: any) {
    this.roadmapService
      .createRoadmapItem(item.id, item.data)
      .subscribe((res) => console.log(res));
  }

  transferRoadmapItem(item: any) {
    this.roadmapService
      .updateRoadmapItem(this.roadmap._id, item)
      .subscribe((res) => {
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
      const item = event.previousContainer.data[event.previousIndex];
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
      this.transferRoadmapItem(item);
      this.transferItem(event);
    }
  }
}

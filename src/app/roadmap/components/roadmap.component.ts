import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
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
  public selectedFilterType: null | string = null;
  public selectedFilterLanguage: null | string = null;
  public selectedView: "compact" | "expanded" = "compact";
  public typeConfig = [
    { title: "Books", name: "book" },
    { title: "Courses", name: "course" },
    { title: "Degrees", name: "degree" },
    { title: "Tutorials", name: "tutorial" },
  ];
  public filterType = "date";
  public languageFilterData: any = {};
  public roadmap: Roadmap;
  public roadmapId: string;

  public todoArray: any[];
  public inProgressArray: any[];
  public doneArray: any[];
  public recommendationsArray: any[];
  public recommendations = DUMMY_ROADMAP;

  constructor(
    private roadmapService: RoadmapService,
    private roadmapStoreService: RoadmapStoreService
  ) {}

  ngOnInit(): void {
    this.roadmapStoreService
      .getRoadmap(this.roadmapId ? this.roadmapId : "")
      .pipe(
        filter((state) => state != null),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((roadmap: Roadmap) => {
        this.roadmap = roadmap;
        this.getRoadmapConfig();
        this.getLanguageFilterData();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getRoadmapConfig(): void {
    const roadmap = this.generateRoadmap(this.roadmap, this.filterType);
    this.todoArray = roadmap.filter(
      (item: any) => !item.startDate && !item.endDate
    );
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

  getLanguageFilterData() {
    const roadmap: any[] = this.generateRoadmap(this.roadmap, this.filterType);
    const languageData: any[] = [];
    const languages: any[] = [];

    roadmap.forEach((item) => {
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
      ...[...sortable.sort((a, b) => b[1] - a[1]).splice(0, 10)].map((item) => {
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

  updateView($event: any) {
    this.selectedView = $event;
  }

  createRoadmapItem(item: any) {
    if (item.data) {
      this.roadmapStoreService.createRoadmapItem(item.id, item.data);
    }
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
      this.transferRoadmapItem(item);
      this.transferItem(event);
    }
  }
}

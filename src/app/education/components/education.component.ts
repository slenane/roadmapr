import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Education } from "../store/education.models";
// import { DUMMY_EDUCATION } from "../constants/dummy.constants";
import { EducationService } from "../services/education.service";
import { EducationStoreService } from "../services/education-store.service";
import {
  EDUCATION_TYPE_CONFIG,
  STATUS,
} from "../constants/education.constants";

@Component({
  selector: "app-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.scss"],
})
export class EducationComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public selectedFilterType: null | string = null;
  public selectedFilterLanguage: null | string = null;
  public selectedView: "compact" | "expanded" = "compact";
  public typeConfig = EDUCATION_TYPE_CONFIG;
  public languageFilterData: any = [];
  public education: Education;
  public educationId: string;
  public educationArray: any[] = [];

  public todo: any[];
  public inProgress: any[];
  public done: any[];
  public recommendations: any[];
  // public recommendations = DUMMY_EDUCATION;

  constructor(
    private educationService: EducationService,
    private educationStoreService: EducationStoreService
  ) {}

  ngOnInit(): void {
    this.educationStoreService
      .getEducation(this.educationId ? this.educationId : "")
      .pipe(
        filter((state) => state != null),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((education: Education) => {
        console.log(education);
        this.education = education;
        this.educationArray = this.education.items;

        if (this.educationArray.length) {
          this.getEducationConfig(this.educationArray);
          this.getLanguageFilterData();
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getEducationConfig(education: any[]): void {
    const todoArray: any[] = [],
      inProgressArray: any[] = [],
      doneArray: any[] = [];

    education.forEach((item) => {
      if (item.status === STATUS.TODO) todoArray.push(item);
      else if (item.status === STATUS.IN_PROGRESS) inProgressArray.push(item);
      else if (item.status === STATUS.DONE) doneArray.push(item);
    });

    this.todo = this.getSortedList(todoArray);
    this.inProgress = this.getSortedList(inProgressArray);
    this.done = this.getSortedList(doneArray);

    // this.recommendations = this.generateEducationArray(
    //   this.recommendations
    // );
  }

  getSortedList(arr: any[]) {
    const pinned: any[] = [],
      regular: any[] = [];

    arr.forEach((item: any) => {
      if (typeof item?.pinned_position === "number") pinned.push(item);
      else regular.push(item);
    });

    return [...this.sortPinnedItems(pinned), ...this.sortItems(regular)];
  }

  sortPinnedItems(arr: any[]): any[] {
    return arr.sort((a: any, b: any): number => {
      if (a.pinned_position < b.pinned_position) return -1;
      else if (a.pinned_position > b.pinned_position) return 1;
      else return 0;
    });
  }

  sortItems(arr: any[]): any[] {
    return arr.sort((a: any, b: any): number => {
      if (a.position < b.position) return -1;
      else if (a.position > b.position) return 1;
      else return 0;
    });
  }

  getLanguageFilterData() {
    const education: any[] = this.educationArray;
    const languageData: any[] = [];
    const languages: any[] = [];

    education.forEach((item) => {
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

  createEducationItem(item: any) {
    if (item.data) {
      this.educationStoreService.createEducationItem(item.id, item.data);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      console.log(event);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(event);
      const item = { ...event.previousContainer.data[event.previousIndex] };
      if (event.container.id === STATUS.TODO) {
        if (item.startDate) item.startDate = null;
        if (item.endDate) item.endDate = null;
        item.status = STATUS.TODO;
      }
      if (event.container.id === STATUS.IN_PROGRESS) {
        if (item.endDate) item.endDate = null;
        if (!item.startDate) item.startDate = new Date();
        item.status = STATUS.IN_PROGRESS;
      }
      if (event.container.id === STATUS.DONE) {
        if (!item.startDate) item.startDate = new Date();
        item.endDate = new Date();
        item.status = STATUS.DONE;
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.educationStoreService.updateEducationItem(item);
    }
  }

  onPinToggle(data: any) {
    if (typeof data?.pinned_position === "number") {
      this.educationStoreService.updateEducationItem({
        ...data,
        pinned_position: null,
      });
    } else {
      const itemList: "todo" | "inProgress" | "done" = data.status;
      let nextPinPosition = 0;

      this[itemList].forEach((item) => {
        if (
          typeof item?.pinned_position === "number" &&
          item.pinned_position >= nextPinPosition
        ) {
          nextPinPosition = item.pinned_position + 1;
        }
      });

      this.educationStoreService.updateEducationItem({
        ...data,
        pinned_position: nextPinPosition,
      });
    }
  }
}

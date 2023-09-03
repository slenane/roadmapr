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

    this.todo = this.sortItems(todoArray);
    this.inProgress = this.sortItems(inProgressArray);
    this.done = this.sortItems(doneArray);

    // this.recommendations = this.generateEducationArray(
    //   this.recommendations
    // );
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
      const newItem = { ...item.data };
      newItem.pinned = false;

      if (!newItem.startDate && !newItem.endDate) {
        newItem.status = STATUS.TODO;
        newItem.position = this.todo.length;
      } else if (newItem.startDate && !newItem.endDate) {
        newItem.status = STATUS.IN_PROGRESS;
        newItem.position = this.inProgress.length;
      } else {
        newItem.status = STATUS.DONE;
        newItem.position = this.done.length;
      }

      this.educationStoreService.createEducationItem(item.id, newItem);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      let itemList: "todo" | "inProgress" | "done";
      let updatedItems = [];

      if (event.container.id === STATUS.TODO) {
        itemList = "todo";
      } else if (event.container.id === STATUS.IN_PROGRESS) {
        itemList = "inProgress";
      } else itemList = "done";

      const dropped = this[itemList][event.previousIndex];

      let permittedPosition: number = event.currentIndex;

      if (!dropped.pinned) {
        if (event.currentIndex <= this.getLastPinnedIndex(itemList))
          permittedPosition = this.getLastPinnedIndex(itemList) + 1;
      }

      updatedItems.push(
        { _id: dropped._id, position: permittedPosition },
        ...this.incrementFollowingItems(
          itemList,
          dropped,
          permittedPosition,
          event.previousIndex
        )
      );

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        permittedPosition
      );

      this.educationStoreService.bulkUpdateEducationItems(
        this.education._id,
        updatedItems
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
    const initialItemPosition = data.position;
    const updatedItems = [];

    const updatedItem = {
      _id: data._id,
      pinned: !data?.pinned,
      position: this.getLastPinnedIndex(data.status),
    };

    updatedItems.push(
      updatedItem,
      ...this.incrementFollowingItems(
        data.status,
        updatedItem,
        updatedItem.position,
        initialItemPosition
      )
    );

    this.educationStoreService.bulkUpdateEducationItems(
      this.education._id,
      updatedItems
    );
  }

  getLastPinnedIndex(itemList: "todo" | "inProgress" | "done") {
    let index = 0;
    this[itemList].forEach((item) => {
      if (item.pinned && item.position > index) index = item.position;
    });
    return index;
  }

  incrementFollowingItems(
    itemList: "todo" | "inProgress" | "done",
    updatedItem: any,
    index: number,
    upperLimit: number
  ) {
    let incrementedItems: any[] = [];

    this[itemList].forEach((item) => {
      if (
        item.position < upperLimit &&
        item.position >= index &&
        item._id !== updatedItem._id
      ) {
        incrementedItems.push({ _id: item._id, position: item.position + 1 });
      }
    });

    return incrementedItems;
  }
}

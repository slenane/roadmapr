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
// import { EducationService } from "../services/education.service";
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
    // private educationService: EducationService,
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
    const currentContainer = event.container;
    const previousContainer = event.previousContainer;
    const currentIndex = event.currentIndex;
    const previousIndex = event.previousIndex;

    const currentItemList: "todo" | "inProgress" | "done" = this.getItemList(
      currentContainer.id
    );
    const previousItemList: "todo" | "inProgress" | "done" = this.getItemList(
      previousContainer.id
    );
    const droppedItem =
      previousContainer === currentContainer
        ? { ...this[currentItemList][previousIndex] }
        : { ...this[previousItemList][previousIndex] };

    let permittedPosition: number = currentIndex;

    if (!droppedItem.pinned) {
      if (
        this.getLastPinnedIndex(currentItemList) >= 0 &&
        currentIndex <= this.getLastPinnedIndex(currentItemList)
      ) {
        permittedPosition = this.getLastPinnedIndex(currentItemList) + 1;
      }
    }

    const updatedItems: any[] = [];

    if (previousContainer === currentContainer) {
      moveItemInArray(currentContainer.data, previousIndex, permittedPosition);

      currentContainer.data.forEach((item) => {
        updatedItems.push({
          _id: item._id,
          position: this[currentItemList].indexOf(item),
        });
      });
    } else {
      if (currentContainer.id === STATUS.TODO) {
        if (droppedItem.startDate) droppedItem.startDate = null;
        if (droppedItem.endDate) droppedItem.endDate = null;
      }
      if (currentContainer.id === STATUS.IN_PROGRESS) {
        if (droppedItem.endDate) droppedItem.endDate = null;
        if (!droppedItem.startDate) droppedItem.startDate = new Date();
      }
      if (currentContainer.id === STATUS.DONE) {
        if (!droppedItem.startDate) droppedItem.startDate = new Date();
        droppedItem.endDate = new Date();
      }

      transferArrayItem(
        previousContainer.data,
        currentContainer.data,
        previousIndex,
        currentIndex
      );

      updatedItems.push({
        _id: droppedItem._id,
        status: currentItemList,
        endDate: droppedItem.endDate,
        startDate: droppedItem.startDate,
        position: permittedPosition,
      });

      currentContainer.data.forEach((item) => {
        if (item._id !== droppedItem._id) {
          updatedItems.push({
            _id: item._id,
            position: this[currentItemList].indexOf(item),
          });
        }
      });
      previousContainer.data.forEach((item) => {
        if (item._id !== droppedItem._id) {
          updatedItems.push({
            _id: item._id,
            position: this[previousItemList].indexOf(item),
          });
        }
      });
    }

    this.educationStoreService.bulkUpdateEducationItems(
      this.education._id,
      updatedItems
    );
  }

  onPinToggle(data: any) {
    const initialItemPosition = data.position;
    const updatedItems = [];

    const updatedItem = {
      _id: data._id,
      pinned: !data?.pinned,
      position:
        this.getLastPinnedIndex(data.status) >= 0
          ? this.getLastPinnedIndex(data.status)
          : 0,
    };

    updatedItems.push(
      updatedItem,
      ...this.incrementFollowingItems(
        data.status,
        updatedItem._id,
        updatedItem.position,
        initialItemPosition
      )
    );

    this.educationStoreService.bulkUpdateEducationItems(
      this.education._id,
      updatedItems
    );
  }

  getItemList(list: string): "todo" | "inProgress" | "done" {
    if (list === STATUS.TODO) return "todo";
    else if (list === STATUS.IN_PROGRESS) return "inProgress";
    else return "done";
  }

  getLastPinnedIndex(itemList: "todo" | "inProgress" | "done") {
    let index: any;
    this[itemList].forEach((item) => {
      if (item.pinned && (typeof index !== "number" || item.position > index))
        index = item.position;
    });
    return index;
  }

  incrementFollowingItems(
    itemList: "todo" | "inProgress" | "done",
    itemId: number,
    index: number,
    upperLimit: number
  ) {
    let incrementedItems: any[] = [];

    this[itemList].forEach((item) => {
      if (
        item.position < upperLimit &&
        item.position >= index &&
        item._id !== itemId
      ) {
        incrementedItems.push({
          _id: item._id,
          name: item.title,
          position: item.position + 1,
        });
      }
    });

    return incrementedItems;
  }
}

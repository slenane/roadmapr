import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Education } from "../store/education.models";
import { DUMMY_EDUCATION } from "../constants/dummy.constants";
import { EducationService } from "../services/education.service";
import { EducationStoreService } from "../services/education-store.service";
import { EDUCATION_TYPES } from "../constants/education.constants";

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
  public typeConfig = [
    { title: "Books", name: "book" },
    { title: "Courses", name: "course" },
    { title: "Degrees", name: "degree" },
    { title: "Tutorials", name: "tutorial" },
  ];
  public languageFilterData: any = [];
  public education: Education;
  public educationId: string;
  public educationArray: any[] = [];

  public todoArray: any[];
  public inProgressArray: any[];
  public doneArray: any[];
  public recommendationsArray: any[];
  public recommendations = DUMMY_EDUCATION;

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
        this.education = education;
        console.log(this.education);

        this.educationArray = this.generateEducationArray(this.education);

        console.log(this.educationArray);

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
    this.todoArray = this.sortPinnedItems(
      education.filter((item: any) => !item.startDate && !item.endDate)
    );

    this.inProgressArray = this.sortPinnedItems(
      education.filter((item: any) => item.startDate && !item.endDate)
    );

    this.doneArray = this.sortPinnedItems(
      education.filter((item: any) => item.endDate)
    );

    this.recommendationsArray = this.generateEducationArray(
      this.recommendations
    );
  }

  generateEducationArray(education: any): any {
    const items: any[] = [];
    const categories = EDUCATION_TYPES;

    for (const category of categories) {
      if (education[category]) {
        education[category].forEach((item: any) => items.push(item));
      }
    }

    return items;
  }

  sortPinnedItems(arr: any[]): any[] {
    return arr.sort((a: any, b: any): number => {
      if (a.pin.pinned && !b.pin.pinned) return -1;
      else if (!a.pin.pinned && b.pin.pinned) return 1;
      else if (a.pin.position < b.pin.position) return -1;
      else if (a.pin.position > b.pin.position) return 1;
      else return 0;
    });
  }

  getLanguageFilterData() {
    const education: any[] = this.generateEducationArray(this.education);
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

  transferEducationItem(item: any) {
    this.educationService
      .updateEducationItem(this.education._id, item)
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
      this.transferEducationItem(item);
      this.transferItem(event);
    }
  }

  onPinToggle(data: any) {
    const itemList = this.findItemList(data._id);
    let nextPinPosition = 0;

    this[itemList].forEach((item) => {
      if (item.pin && item.pin.pinned && item.pin.position >= nextPinPosition) {
        nextPinPosition = item.pin.position + 1;
      }
    });

    this.educationStoreService.updateEducationItem({
      ...data,
      pin: { ...data.pin, position: nextPinPosition },
    });
  }

  findItemList(id: number): "todoArray" | "inProgressArray" | "doneArray" {
    if (this.todoArray.find((item) => item._id === id)) {
      return "todoArray";
    } else if (this.inProgressArray.find((item) => item._id === id)) {
      return "inProgressArray";
    } else {
      return "doneArray";
    }
  }
}

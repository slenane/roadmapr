import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Education } from "../store/education.models";
import { EducationStoreService } from "../services/education-store.service";
import {
  EDUCATION_TYPE_CONFIG,
  STATUS,
} from "../constants/education.constants";
import { DropListService } from "src/app/shared/services/drop-list.service";
import { educationInitialState } from "../store/education.reducer";
import { RecommendationsStoreService } from "src/app/recommendations/services/recommendations-store.service";
import { Recommendation } from "src/app/recommendations/store/recommendations.models";

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
  public educationList: any[] = [];

  public todo: any[];
  public inProgress: any[];
  public done: any[];
  public recommendations: Recommendation[];

  constructor(
    private educationStoreService: EducationStoreService,
    private recommendationsStoreService: RecommendationsStoreService,
    private dropListService: DropListService
  ) {}

  ngOnInit(): void {
    this.educationStoreService
      .getEducation(this.educationId ? this.educationId : "")
      .pipe(
        filter((state) => state != educationInitialState),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((education: Education) => {
        this.education = education;
        this.educationList = this.education.educationList;
        this.getEducationConfig(this.educationList);
        this.getLanguageFilterData();
      });

    this.recommendationsStoreService
      .getRecommendations()
      .pipe(
        filter((state) => state?.length),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((recommendations: Recommendation[]) => {
        this.recommendations = [...recommendations];
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
      if (item.status === STATUS.IN_PROGRESS) inProgressArray.push(item);
      else if (item.status === STATUS.DONE) doneArray.push(item);
      else todoArray.push(item);
    });

    this.todo = this.sortItems(todoArray);
    this.inProgress = this.sortItems(inProgressArray);
    this.done = this.sortItems(doneArray);

    // this.recommendations = this.generateEducationList(
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
    const education: any[] = this.educationList;
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

  createEducationItemFromRecommendation(item: any) {
    console.log(item);
    if (item.data) {
      const newItem = {
        author: item.data.author,
        description: item.data.description,
        endDate: null,
        link: item.data.link,
        stack: item.data.stack,
        startDate: null,
        title: item.data.title,
        type: item.data.type,
        pinned: false,
        status: STATUS.TODO,
        position: this.todo.length,
      };

      this.educationStoreService.createEducationItem(item.id, newItem);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    const updatedItems = this.dropListService.drop(event);

    if (updatedItems.length) {
      this.educationStoreService.bulkUpdateEducationItems(
        this.education._id,
        updatedItems
      );
    }
  }

  onPinToggle(data: any, itemList: any[]) {
    const updatedItems = this.dropListService.onPinToggle(itemList, data);

    if (updatedItems) {
      this.educationStoreService.bulkUpdateEducationItems(
        this.education._id,
        updatedItems
      );
    }
  }

  removeRecommendationAtIndex(index: number): void {
    this.recommendations.splice(index, 1);
  }

  addRecommendationToList(data: { item: Recommendation; index: number }): void {
    this.createEducationItemFromRecommendation({
      id: this.education._id,
      data: data.item,
    });
    this.removeRecommendationAtIndex(data.index);
  }
}

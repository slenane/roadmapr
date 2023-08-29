import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { Employment } from "../store/employment.models";
import { EmploymentStoreService } from "../services/employment-store.service";
import { MatDialog } from "@angular/material/dialog";
import { EmploymentService } from "../services/employment.service";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-employment",
  templateUrl: "./employment.component.html",
  styleUrls: ["./employment.component.scss"],
})
export class EmploymentComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public selectedFilterType: null | string = null;
  public selectedFilterLanguage: null | string = null;
  public selectedView: "compact" | "expanded" = "compact";
  public typeConfig = [
    { title: "Employment", name: "employment" },
    { title: "Freelance", name: "freelance" },
  ];
  public filterType = "date";
  public languageFilterData: any = [];
  public employment: Employment;
  public employmentId: string;
  public employmentList: any[];

  public todoArray: any[];
  public inProgressArray: any[];
  public doneArray: any[];

  constructor(
    private employmentService: EmploymentService,
    private employmentStoreService: EmploymentStoreService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.employmentStoreService
      .getEmployment(this.employmentId ? this.employmentId : "")
      .pipe(
        filter((state) => state != null),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((employment: Employment) => {
        this.employment = employment;
        if (this.employment.employmentList.length) {
          this.sortEmploymentList([...employment.employmentList]);
          this.getEmploymentConfig();
          this.getLanguageFilterData();
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getEmploymentConfig(): void {
    const employment = this.generateEmployment(
      this.employmentList,
      this.filterType
    );
    this.todoArray = employment.filter(
      (item: any) => !item.startDate && !item.endDate
    );
    this.inProgressArray = employment.filter(
      (item: any) => item.startDate && !item.endDate
    );
    this.doneArray = employment.filter((item: any) => item.endDate);
  }

  generateEmployment(employment: any, filter: string): any {
    switch (filter) {
      case "date":
        return employment;
    }
  }

  getLanguageFilterData() {
    const employment: any[] = this.generateEmployment(
      this.employmentList,
      this.filterType
    );
    const languageData: any[] = [];
    const languages: any[] = [];

    employment.forEach((item) => {
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

  sortEmploymentList(list: any[]) {
    const previousEmployment = list.filter((item) => item.endDate);
    const currentEmployment = list.filter((item) => !item.endDate);

    this.employmentList = [
      ...currentEmployment.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      ),
      ...previousEmployment.sort(
        (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      ),
    ];
  }

  createEmploymentItem(item: any) {
    if (item.data) {
      this.employmentStoreService.createEmploymentItem(item.id, item.data);
    }
  }

  transferEmployment(item: any) {
    this.employmentService
      .updateEmploymentItem(this.employment._id, item)
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
      this.transferEmployment(item);
      this.transferItem(event);
    }
  }
}

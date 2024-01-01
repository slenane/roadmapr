import {
  Component,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { EducationItem } from "src/app/education/store/education.models";
import { IStack } from "src/app/shared/constants/dev-paths.constants";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexStroke,
} from "ng-apexcharts";

export type ChartOptions = {
  theme: { mode: "dark" };
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
};

@Component({
  selector: "app-roadmap-education",
  templateUrl: "./roadmap-education.component.html",
  styleUrls: ["./roadmap-education.component.scss"],
})
export class RoadmapEducationComponent implements OnInit, OnChanges {
  public books: number;
  public courses: number;
  public inProgress: number;
  public completed: number;
  public bookTrend: number;
  public courseTrend: number;
  public completionRate: number;
  public stackCoverage: number | "N/A" = "N/A";
  public chartOptions: ChartOptions;

  @ViewChild("chart") chart: ChartComponent;

  @Input() data: EducationItem[];
  @Input() userStack: IStack | undefined;
  @Input() stackList: any[];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.data &&
      changes.data.currentValue != changes.data.previousValue
    ) {
      this.generateData();
      this.generateChart();
    }
    if (
      (changes.userStack &&
        changes.userStack.currentValue != changes.userStack.previousValue) ||
      (changes.userStack &&
        changes.userStack.currentValue != changes.userStack.previousValue)
    ) {
      this.getStackCoverage();
    }
  }

  generateData() {
    this.setInitialValues();

    this.data.forEach((item: EducationItem) => {
      if (item.type === "book") this.books += 1;
      else this.courses += 1;

      if (item.endDate) this.completed += 1;
      else this.inProgress += 1;
    });

    this.completionRate =
      this.inProgress + this.completed !== 0
        ? Math.ceil((100 * this.completed) / (this.inProgress + this.completed))
        : 0;
  }

  getStackCoverage() {
    const completeStack = [...(this.userStack?.stack.core || [])];
    let count = 0;

    for (let stack in this.stackList) {
      if (completeStack.find((item) => item.name === stack)) count += 1;
    }

    this.stackCoverage =
      count + completeStack.length !== 0
        ? Math.ceil((count / completeStack.length) * 100)
        : 0;
  }

  generateChart() {
    const months = this.getPast12Months();
    const [bookData, courseData] = this.getChartData(months);

    this.chartOptions = {
      theme: {
        mode: "dark",
      },
      series: [
        {
          name: "Courses",
          data: courseData,
          color: "#00BBD4",
        },
        {
          name: "Books",
          data: bookData,
          color: "#00D4A6",
        },
      ],
      chart: {
        height: 250,
        type: "area",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: months.map((month) => month.replace(/\s\d{4}/, "")),
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (+val).toFixed(0).toString();
          },
        },
      },
    };
  }

  getPast12Months() {
    const today = new Date();
    const past12Months = [];

    for (let i = 0; i < 12; i++) {
      const currentMonth = today.getMonth() - i;
      const adjustedMonth = (currentMonth + 12) % 12;
      const adjustedYear =
        today.getFullYear() - Math.abs(Math.floor((today.getMonth() - i) / 12));

      const formattedDate = new Date(
        adjustedYear,
        adjustedMonth,
        1
      ).toLocaleString("en-us", { month: "short", year: "numeric" });

      past12Months.unshift(formattedDate);
    }

    return past12Months;
  }

  getChartData(months: string[]): [number[], number[]] {
    const bookObject: any = {},
      courseObject: any = {};
    let booksLastPeriod = 0,
      coursesLastPeriod = 0;

    const books = this.data.filter((item: EducationItem) => {
      return item.type === "book" && item.status === "done";
    });
    const courses = this.data.filter((item: EducationItem) => {
      return item.type === "course" && item.status === "done";
    });

    books.forEach((book) => {
      const period = new Date(book.endDate).toLocaleString("en-us", {
        month: "short",
        year: "numeric",
      });

      if (months.indexOf(period) !== -1) {
        if (bookObject[period]) bookObject[period]++;
        else bookObject[period] = 1;
      } else {
        booksLastPeriod++;
      }
    });

    courses.forEach((course) => {
      const period = new Date(course.endDate).toLocaleString("en-us", {
        month: "short",
        year: "numeric",
      });

      if (months.indexOf(period) !== -1) {
        if (courseObject[period]) courseObject[period]++;
        else courseObject[period] = 1;
      } else {
        coursesLastPeriod++;
      }
    });

    const bookData = this.getAccumulatedData(
      months,
      booksLastPeriod,
      bookObject
    );
    const courseData = this.getAccumulatedData(
      months,
      coursesLastPeriod,
      courseObject
    );

    this.bookTrend =
      bookData[bookData.length - 1] - bookData[bookData.length - 2];
    this.courseTrend =
      courseData[courseData.length - 1] - courseData[courseData.length - 2];

    return [bookData, courseData];
  }

  getAccumulatedData(array: string[], initial: number, obj: any) {
    let result = initial;
    const accumulatedValues = [];

    for (const key of array) {
      if (obj.hasOwnProperty(key)) {
        result += obj[key];
      }
      accumulatedValues.push(result);
    }

    return accumulatedValues;
  }

  setInitialValues() {
    this.books = 0;
    this.courses = 0;
    this.inProgress = 0;
    this.completed = 0;
  }
}

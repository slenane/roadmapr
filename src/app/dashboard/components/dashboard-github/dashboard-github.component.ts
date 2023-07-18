import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { STACK_LIST } from "src/app/shared/constants/stack-list.constants";

@Component({
  selector: "app-dashboard-github",
  templateUrl: "./dashboard-github.component.html",
  styleUrls: ["./dashboard-github.component.scss"],
})
export class DashboardGithubComponent implements OnInit, OnChanges {
  public displayedColumns: string[] = ["name", "language"];
  public dataSource: MatTableDataSource<any>;
  public mostRecent: any[] = [];
  public stack: any[] = [...STACK_LIST];

  @Input() data: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.data.currentValue &&
      changes.data.currentValue != changes.data.previousValue
    ) {
      if (changes.data.currentValue.length) {
        this.getRecentRepos(changes.data.currentValue);
      }
    }
  }

  getRecentRepos(data: any) {
    data = data.sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    data.forEach((item: any) => {
      const language = this.stack.find(
        (language) => language.title == item.language
      );
      if (language && language.name) item.language = language.name;
      else item.language = "javascript";
    });

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

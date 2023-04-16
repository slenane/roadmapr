import { Component, OnInit } from "@angular/core";
import { SIDEBAR_OPTIONS } from "src/app/shared/constants/sidebar.constants";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public options = SIDEBAR_OPTIONS;

  constructor() {}

  ngOnInit(): void {}
}

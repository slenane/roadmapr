import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-git-auth",
  templateUrl: "./git-auth.component.html",
  styleUrls: ["./git-auth.component.scss"],
})
export class GitAuthComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // COmponent required for github auth redirect only
  }
}

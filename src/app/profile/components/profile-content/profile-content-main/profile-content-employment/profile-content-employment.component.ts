import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-content-employment",
  templateUrl: "./profile-content-employment.component.html",
  styleUrls: ["./profile-content-employment.component.scss"],
})
export class ProfileContentEmploymentComponent implements OnInit {
  @Input() employment: any;

  constructor() {}

  ngOnInit(): void {}
}

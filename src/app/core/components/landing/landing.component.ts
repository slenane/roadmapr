import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  public isRegistering: boolean;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.isRegistering = this.location.path() === "/register" ? true : false;
  }
}

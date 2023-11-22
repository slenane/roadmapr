import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-icon-card",
  templateUrl: "./icon-card.component.html",
  styleUrls: ["./icon-card.component.scss"],
})
export class IconCardComponent implements OnInit {
  @Input() icon: string;
  @Input() iconStyle: string;
  @Input() title: string;
  @Input() value: number | string;
  @Input() trend: number;

  constructor() {}

  ngOnInit(): void {}
}

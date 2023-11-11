import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-drop-list-empty",
  templateUrl: "./drop-list-empty.component.html",
  styleUrls: ["./drop-list-empty.component.scss"],
})
export class DropListEmptyComponent implements OnInit {
  @Input() header: string;
  @Input() message: string;

  constructor() {}

  ngOnInit(): void {}
}

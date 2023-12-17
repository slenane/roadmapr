import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-drop-list-filter-items",
  templateUrl: "./drop-list-filter-items.component.html",
  styleUrls: ["./drop-list-filter-items.component.scss"],
})
export class DropListFilterItemsComponent implements OnInit {
  @Input() type: string;
  @Input() typeConfig: any[];
  @Input() selectedView: "compact" | "expanded";
  @Input() sortedStack: any[];
  @Input() selectedLanguage: any[];
  @Input() selectedType: any[];
  @Output() onFilterType: EventEmitter<null | string> = new EventEmitter();
  @Output() onFilterLanguage: EventEmitter<null | string> = new EventEmitter();
  @Output() onClearFilters: EventEmitter<null | string> = new EventEmitter();
  @Output() onUpdateView: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}

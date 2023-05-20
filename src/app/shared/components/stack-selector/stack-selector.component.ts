import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { STACK_LIST } from "src/app/roadmap/constants/stack-list.constants";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from "@angular/material/autocomplete";
import { map, Observable, startWith } from "rxjs";
import { FormControl, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-stack-selector",
  templateUrl: "./stack-selector.component.html",
  styleUrls: ["./stack-selector.component.scss"],
})
export class StackSelectorComponent implements OnInit {
  public selectedStack: any[] = [];
  public stackCtrl = new FormControl("", Validators.required);
  public filteredStackItems: Observable<any[]>;
  public visible = true;
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [13, 16];
  public stack: any[] = [...STACK_LIST];

  @Input("data") data: any;

  @ViewChild("stackInput") stackInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredStackItems = this.stackCtrl.valueChanges.pipe(
      startWith(null),
      map((item: any) => (item ? this._filter(item) : this.stack.slice()))
    );
  }

  ngOnInit() {
    if (this.data) this.selectedStack = this.data;
  }

  addStackItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (value) this.matAutocomplete.options.some((option) => option.selected);
    if (input) input.value = "";
    this.stackCtrl.setValue("");
  }

  removeStackItem(stack: any): void {
    const item = this.selectedStack.find(
      (item: any) => item.title === stack.title
    );
    if (item) {
      const index = this.selectedStack.indexOf(item);
      if (index >= 0) this.selectedStack.splice(index, 1);
    }
  }

  selectedStackItem(event: MatAutocompleteSelectedEvent): void {
    event.option.deselect();
    const current = this.stack.find(
      (item) => item.title === event.option.viewValue
    );
    this.selectedStack.push(current);
    this.stackInput.nativeElement.value = "";
    this.stackCtrl.setValue("");
  }

  private _filter(value: string): any[] {
    if (typeof value === "string") {
      const filterValue = value.toLowerCase();
      return this.stack.filter(
        (item) => item.title.toLowerCase().indexOf(filterValue) === 0
      );
    } else {
      return [];
    }
  }

  getData(): any {
    return this.selectedStack;
  }
}

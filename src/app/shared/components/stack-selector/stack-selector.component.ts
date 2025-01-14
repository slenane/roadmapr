import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  SimpleChanges,
} from "@angular/core";
import { STACK_LIST } from "src/app/shared/constants/stack-list.constants";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from "@angular/material/autocomplete";
import { map, Observable, startWith } from "rxjs";
import { FormControl, Validators } from "@angular/forms";
import { MatChipInputEvent, MatChipList } from "@angular/material/chips";

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

  @Input() data: any;
  @Input() type: any;

  @ViewChild("stackInput") stackInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  @ViewChild("chipList") chipList: MatChipList;

  constructor() {
    this.filteredStackItems = this.stackCtrl.valueChanges.pipe(
      startWith(null),
      map((item: any) => (item ? this._filter(item) : this.stack.slice()))
    );
  }

  ngOnInit() {
    if (this.data) {
      this.selectedStack = [...this.data];
      this.updateStackList();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.type &&
      changes.type.currentValue !== changes.type.previousValue
    ) {
      if (changes.type.currentValue === "book") {
        if (this.chipList) {
          this.chipList.errorState = false;
        }
      }
    }
  }

  addStackItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (value) this.matAutocomplete.options.some((option) => option.selected);
    if (input) input.value = "";
    this.stackCtrl.setValue("");
    if (this.chipList) {
      this.chipList.errorState = false;
    }
  }

  removeStackItem(stack: any): void {
    const item = this.selectedStack.find(
      (item: any) => item.title === stack.title
    );
    if (item) {
      const index = this.selectedStack.indexOf(item);
      if (index >= 0) this.selectedStack.splice(index, 1);
      this.updateStackList();
      if (!this.selectedStack.length) this.chipList.errorState = true;
    }
  }

  selectedStackItem(event: MatAutocompleteSelectedEvent): void {
    event.option.deselect();
    const current = this.stack.find(
      (item) => item.title === event.option.viewValue
    );
    if (!this.selectedStack.includes(current)) {
      this.selectedStack.push(current);
      this.updateStackList();
      if (this.chipList) {
        this.chipList.errorState = false;
      }
    }
    this.stackInput.nativeElement.value = "";
    this.stackCtrl.setValue("");
  }

  updateStackList() {
    this.stack = this.stack.filter((item) => {
      return !this.selectedStack.includes(item);
    });
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

  isStackValid() {
    return this.type === "book" || this.selectedStack.length ? true : false;
  }

  getRequiredOnBlur() {
    if (!this.isStackValid() && this.chipList) {
      this.chipList.errorState = true;
    }
  }

  getData(): any {
    if (!this.isStackValid() && this.chipList) {
      this.chipList.errorState = true;
      this.stackInput.nativeElement.focus();
    }

    return this.selectedStack;
  }
}

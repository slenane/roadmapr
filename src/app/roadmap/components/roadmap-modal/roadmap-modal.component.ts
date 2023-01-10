import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ROADMAP_TYPES } from '../../constants/roadmap.constants';
import { TECHNOLOGY_LIST } from '../../constants/technology-list.constants';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-roadmap-modal',
  templateUrl: './roadmap-modal.component.html',
  styleUrls: ['./roadmap-modal.component.scss']
})
export class RoadmapModalComponent {
  public roadmapTypes = ROADMAP_TYPES;
  
  public selectedTech: any[] = [];
  stackCtrl = new FormControl();
  filteredStackItems: Observable<any[]>;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [13, 16];
  public stack: any[] = [...TECHNOLOGY_LIST];

  @ViewChild('stackInput') stackInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<RoadmapModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.filteredStackItems = this.stackCtrl.valueChanges.pipe(
      startWith(null),
      map((technology: any) => technology ? this._filter(technology) : this.stack.slice()));
  }

  addStackItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if (value) this.matAutocomplete.options.some(option => option.selected);

    // Reset the input value
    if (input) input.value = '';

    this.stackCtrl.setValue(null);
  }
  
  removeStackItem(technology: any): void {
    const item =  this.selectedTech.find((item: any) => item.title === technology.title);
    if (item) {
      const index = this.selectedTech.indexOf(item);
      if (index >= 0) this.selectedTech.splice(index, 1);
    }
  }

  selectedStackItem(event: MatAutocompleteSelectedEvent): void {
    event.option.deselect();
    const current = this.stack.find(item => item.title === event.option.viewValue);
    this.selectedTech.push(current);
    this.stackInput.nativeElement.value = '';
    this.stackCtrl.setValue('');
  }

  private _filter(value: string): any[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.stack.filter(technology => technology.title.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return [];
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      ...this.data, type: this.selectedTech
    });
  }

}

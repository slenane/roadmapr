import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { StackSelectorComponent } from 'src/app/shared/components/stack-selector/stack-selector.component';

@Component({
  selector: 'app-roadmap-update-book',
  templateUrl: './roadmap-update-book.component.html',
  styleUrls: ['./roadmap-update-book.component.scss']
})
export class RoadmapUpdateBookComponent implements OnInit {
  public bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    startDate: new FormControl<Date>(new Date(), Validators.required),
    endDate: new FormControl<Date>(new Date()),
    description: new FormControl('', Validators.required),
    topics: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required),
  });

  @ViewChild('stack') stack: StackSelectorComponent;
  @ViewChild('title') title: ElementRef;
  @ViewChild('author') author: ElementRef;
  @ViewChild('startDateInput') startDateInput: ElementRef;
  @ViewChild('description') description: ElementRef;
  @ViewChild('topics') topics: ElementRef;
  @ViewChild('link') link: ElementRef;
  @ViewChild('publisher') publisher: ElementRef;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  focusError() {
    for (const key of Object.keys(this.bookForm.controls)) {
      if (this.bookForm.get(key) && this.bookForm.get(key)?.invalid) {
        const invalidField = this.el.nativeElement.querySelector(`[formControlName=${key}]`);
        invalidField.focus();
        return;
      }
    }
  }

  getData(): any {
    const stack = this.stack.getData() || [];

    if (this.bookForm.valid && stack.length) {
      return {...this.bookForm.value, stack};
    } else {
      this.focusError();
    }
  }
}

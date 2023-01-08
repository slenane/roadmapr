import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RoadmapModalComponent } from '../roadmap-modal/roadmap-modal.component';

@Component({
  selector: 'app-roadmap-filters',
  templateUrl: './roadmap-filters.component.html',
  styleUrls: ['./roadmap-filters.component.scss']
})
export class RoadmapFiltersComponent implements OnInit {
  public filters = [
    {title: 'Books', type: 'book'},
    {title: 'Courses', type: 'course'},
    {title: 'Degrees', type: 'degree'},
    {title: 'Tutorials', type: 'tutorial'},
  ];

  public roadmapForm = new FormGroup({
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    endDate: new FormControl<Date>(new Date(), Validators.required),
    link: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required),
    stack: new FormControl('', Validators.required),
    startDate: new FormControl<Date>(new Date(), Validators.required),
    title: new FormControl('', Validators.required),
    topics: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });

  @Output() filterRoadmap: EventEmitter<null | string> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RoadmapModalComponent, {
      data: this.roadmapForm,
      width: '60vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(this.roadmapForm);
    });
  }
}

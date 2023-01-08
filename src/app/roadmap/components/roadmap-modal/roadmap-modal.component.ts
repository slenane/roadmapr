import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ROADMAP_TYPES } from '../../constants/roadmap.constants';
import { TECHNOLOGY_LIST } from '../../constants/technology-list.constants';

@Component({
  selector: 'app-roadmap-modal',
  templateUrl: './roadmap-modal.component.html',
  styleUrls: ['./roadmap-modal.component.scss']
})
export class RoadmapModalComponent {
  public roadmapTypes = ROADMAP_TYPES;
  public stack = TECHNOLOGY_LIST;
  public selectedType: string;

  constructor(
    public dialogRef: MatDialogRef<RoadmapModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      ...this.data, type: this.selectedType
    });
  }

}

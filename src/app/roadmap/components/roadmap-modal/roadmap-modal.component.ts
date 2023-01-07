import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-roadmap-modal',
  templateUrl: './roadmap-modal.component.html',
  styleUrls: ['./roadmap-modal.component.scss']
})
export class RoadmapModalComponent {
  public roadmapTypes = ['book', 'course', 'degree', 'tutorial'];
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

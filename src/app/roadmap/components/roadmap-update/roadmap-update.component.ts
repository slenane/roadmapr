import { Component, ElementRef, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  DEV_PATHS,
  DEV_STACKS,
} from "src/app/shared/constants/dev-paths.constants";

@Component({
  selector: "app-roadmap-update",
  templateUrl: "./roadmap-update.component.html",
  styleUrls: ["./roadmap-update.component.scss"],
})
export class RoadmapUpdateComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public DEV_PATHS = DEV_PATHS;
  public DEV_STACKS = DEV_STACKS;

  public isUpdating: boolean = false;
  public stackForm = new FormGroup({
    pathCtrl: new FormControl("", Validators.required),
  });

  constructor(
    private el: ElementRef,
    public dialogRef: MatDialogRef<RoadmapUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    // const stack = this.stack.getData() || [];
    // if (this.experienceForm.valid && stack.length) {
    //   return this.dialogRef.close({ ...this.experienceForm.value, stack });
    // } else {
    //   this.focusError();
    // }
  }

  compareValues(a: any, b: any): boolean {
    return a && b && a.id === b.id;
  }
}

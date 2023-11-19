import { Component, OnInit, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { Subject } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  CUSTOM_STACK,
  DEV_PATHS,
  DEV_STACKS,
  IDeveloperPath,
  IDeveloperStack,
  IStack,
} from "src/app/shared/constants/dev-paths.constants";

@Component({
  selector: "app-roadmap-update",
  templateUrl: "./roadmap-update.component.html",
  styleUrls: ["./roadmap-update.component.scss"],
})
export class RoadmapUpdateComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public developerPaths: IDeveloperPath[] = DEV_PATHS;
  public developerStacks: IStack[] = DEV_STACKS;
  public customStack: IStack = CUSTOM_STACK;
  public currentPath: IDeveloperPath = this.developerPaths[0];
  public stackList: IStack[] = this.developerStacks.filter(
    (stack) => stack.path.name === this.currentPath.name
  );
  public selectedStack: any;

  public isUpdating: boolean = false;
  public form = new FormGroup({
    pathCtrl: new FormControl<IDeveloperPath | null>(null, Validators.required),
    stackCtrl: new FormControl<IDeveloperStack | null>(
      null,
      Validators.required
    ),
  });

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RoadmapUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form.controls.pathCtrl.valueChanges.subscribe(
      (path: IDeveloperPath | null) => {
        if (path) {
          this.currentPath = path;
          this.updateStackList(path);

          if (!this.stackListIncludesSelected()) {
            this.form.patchValue({
              stackCtrl: null,
            });
            this.selectedStack = null;
          }
        }
      }
    );

    if (this.data) {
      this.form.patchValue({
        pathCtrl: this.data.path,
        stackCtrl: this.selectedStack,
      });

      this.selectedStack = this.data.stack;
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateStackList(path: IDeveloperPath) {
    this.stackList = this.developerStacks.filter(
      (stack) => stack.path.name === path.name
    );
  }

  stackListIncludesSelected() {
    if (this.stackList.length && this.selectedStack?.id) {
      for (let item in this.stackList) {
        if (this.stackList[item].type.id === this.selectedStack.id) {
          return true;
        }
      }
    }
    return false;
  }

  getStackListArray(): any[] {
    return Object.values(this.stackList) ? Object.values(this.stackList) : [];
  }

  selectStack(stack: IDeveloperStack) {
    this.selectedStack = stack;

    this.form.patchValue({
      stackCtrl: this.selectedStack,
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    if (this.form.valid) {
      return this.dialogRef.close({
        path: this.form.value.pathCtrl,
        stack: this.form.value.stackCtrl,
      });
    }
  }

  compareValues(a: any, b: any): boolean {
    return a && b && a.id === b.id;
  }
}

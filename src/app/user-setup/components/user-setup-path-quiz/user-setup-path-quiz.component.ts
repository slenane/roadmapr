import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { DEVELOPER_PATH_QUESTIONS } from "../../constants/developer-path.constants";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { UserSetupService } from "../../services/user-setup.service";

@Component({
  selector: "app-user-setup-path-quiz",
  templateUrl: "./user-setup-path-quiz.component.html",
  styleUrls: ["./user-setup-path-quiz.component.scss"],
})
export class UserSetupPathQuizComponent implements OnInit {
  public progress = 0;
  public questions = DEVELOPER_PATH_QUESTIONS;
  public results = {
    frontend: 0,
    backend: 0,
    fullStack: 0,
    mobile: 0,
    game: 0,
  };
  public recommendation = {
    title: "",
    description: "",
  };

  public questionZeroForm = new FormGroup({
    questionCtrl: new FormControl("", Validators.required),
  });
  public questionOneForm = new FormGroup({
    questionCtrl: new FormControl("", Validators.required),
  });
  public questionTwoForm = new FormGroup({
    questionCtrl: new FormControl("", Validators.required),
  });
  public questionThreeForm = new FormGroup({
    questionCtrl: new FormControl("", Validators.required),
  });
  public questionFourForm = new FormGroup({
    questionCtrl: new FormControl("", Validators.required),
  });

  @ViewChild("stepper", { static: false }) stepper: MatStepper;

  constructor(
    public dialogRef: MatDialogRef<UserSetupPathQuizComponent>,
    private userSetupService: UserSetupService
  ) {}

  ngOnInit(): void {}

  onStepChange(event: any) {
    if (event.selectedIndex === this.questions.length) {
      this.getRecommendation();
    }
  }

  getRecommendation() {
    const results: any = {
      0: this.questionZeroForm.value.questionCtrl,
      1: this.questionOneForm.value.questionCtrl,
      2: this.questionTwoForm.value.questionCtrl,
      3: this.questionThreeForm.value.questionCtrl,
      4: this.questionFourForm.value.questionCtrl,
    };

    this.recommendation = this.userSetupService.getRecommendedPath(results);
  }

  acceptPath() {
    if (this.recommendation.title) {
      this.dialogRef.close(this.recommendation.title);
    }
  }
}

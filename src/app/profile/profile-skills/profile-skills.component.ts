import { Component, OnInit, Input } from "@angular/core";
import { STACK_LIST } from "src/app/roadmap/constants/stack-list.constants";

@Component({
  selector: "app-profile-skills",
  templateUrl: "./profile-skills.component.html",
  styleUrls: ["./profile-skills.component.scss"],
})
export class ProfileSkillsComponent implements OnInit {
  public stackList = STACK_LIST;
  public stack: any = [];

  @Input() skills: any;
  @Input() languagesSpoken: any;

  constructor() {}

  ngOnInit(): void {
    for (const key of Object.values(this.stackList)) {
      if (this.skills.includes(key.name)) this.stack.push(key);
    }
  }
}

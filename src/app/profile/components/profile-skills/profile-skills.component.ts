import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { STACK_LIST } from "src/app/roadmap/constants/stack-list.constants";
import * as COUNTRY_LIST from "src/assets/json/countries.json";

@Component({
  selector: "app-profile-skills",
  templateUrl: "./profile-skills.component.html",
  styleUrls: ["./profile-skills.component.scss"],
})
export class ProfileSkillsComponent implements OnInit, OnChanges {
  public stackList = STACK_LIST;
  public countryList: any = COUNTRY_LIST;
  public stack: any = [];

  @Input() skills: any[] = [];
  @Input() languagesSpoken: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.stack = [];
    for (const key of Object.values(this.stackList)) {
      if (this.skills.includes(key.name)) this.stack.push(key);
    }
  }
}

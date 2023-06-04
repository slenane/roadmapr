import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { Settings } from "../store/settings.models";
import { SettingsStoreService } from "../services/settings-store.service";
import { Store } from "@ngrx/store";
import { Profile } from "src/app/profile/store/profile.models";
import * as profileSelectors from "src/app/profile/store/profile.selectors";
import { filter, takeUntil } from "rxjs/operators";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public filterType = "date";
  public userId: string;
  public settings: Settings;

  public settingsForm = new FormGroup({
    username: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    // password: new FormControl("", Validators.required),
    theme: new FormControl("light"),
    notifications: new FormControl(true),
  });

  @ViewChild("username") username: ElementRef;
  @ViewChild("email") email: ElementRef;

  constructor(
    private el: ElementRef,
    private settingsStoreService: SettingsStoreService,
    private store: Store<Profile>
  ) {}

  ngOnInit(): void {
    this.store
      .select(profileSelectors.getProfile)
      .pipe(
        filter((data) => !!data),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((user) => {
        this.userId = user._id;
        const settings = {
          username: user.username,
          email: user.email,
          theme: user.theme,
          notifications: user.notifications,
        };

        this.updateSettingsForm(settings);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateSettingsForm(settings: any) {
    if (settings) {
      this.settingsForm.patchValue({
        username: settings.username,
        email: settings.email,
        // password: settings.password,
        theme: settings.theme,
        notifications: settings.notifications,
      });
    }
  }

  focusError() {
    for (const key of Object.keys(this.settingsForm.controls)) {
      if (this.settingsForm.get(key) && this.settingsForm.get(key)?.invalid) {
        const invalidField = this.el.nativeElement.querySelector(
          `[formControlName=${key}]`
        );
        invalidField.focus();
        return;
      }
    }
  }

  onSaveClick(): void {
    if (this.settingsForm.status === "VALID") {
      this.settingsStoreService.updateSettings(
        this.userId,
        this.settingsForm.value
      );
    } else {
      this.focusError();
    }
  }
}

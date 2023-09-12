import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { Settings } from "../store/settings.models";
import { SettingsStoreService } from "../services/settings-store.service";
import { Store } from "@ngrx/store";
import { Profile } from "src/app/profile/store/profile.models";
import * as profileSelectors from "src/app/profile/store/profile.selectors";
import { filter, takeUntil } from "rxjs/operators";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ThemeService } from "src/app/core/services/theme.service";
import {
  DARK_THEME,
  LIGHT_THEME,
} from "src/app/core/constants/theme.constants";

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
  public theme: string;
  public LIGHT_THEME = LIGHT_THEME;
  public DARK_THEME = DARK_THEME;

  public settingsForm = new FormGroup({
    usernameCtrl: new FormControl("", Validators.required),
    emailCtrl: new FormControl("", Validators.required),
    // password: new FormControl("", Validators.required),
    themeCtrl: new FormControl(""),
    notificationsCtrl: new FormControl(true),
  });

  @ViewChild("username") username: ElementRef;
  @ViewChild("email") email: ElementRef;

  constructor(
    private el: ElementRef,
    private settingsStoreService: SettingsStoreService,
    private store: Store<Profile>,
    private themeService: ThemeService
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
        usernameCtrl: settings.username,
        emailCtrl: settings.email,
        // password: settings.password,
        themeCtrl: settings.theme,
        notificationsCtrl: settings.notifications,
      });
    }
  }

  updateTheme(value: any) {
    this.themeService.updateTheme(value);
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
      this.settingsStoreService.updateSettings(this.userId, {
        username: this.settingsForm.value.usernameCtrl,
        email: this.settingsForm.value.emailCtrl,
        // password: this.settingsForm.value.password,
        theme: this.settingsForm.value.themeCtrl,
        notifications: this.settingsForm.value.notificationsCtrl,
      });
    } else {
      this.focusError();
    }
  }
}

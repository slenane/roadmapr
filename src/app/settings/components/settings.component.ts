import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { Settings } from "../store/settings.models";
import { SettingsStoreService } from "../services/settings-store.service";
import { Profile } from "src/app/profile/store/profile.models";
import { filter, takeUntil } from "rxjs/operators";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ThemeService } from "src/app/core/services/theme.service";
import { THEME_OPTIONS } from "src/app/core/constants/theme.constants";
import { LANGUAGE_OPTIONS } from "../constants/settings.constants";
import { TranslateService } from "@ngx-translate/core";
import { ProfileStoreService } from "src/app/profile/services/profile-store.service";
import { SettingsDeleteAccountComponent } from "./settings-delete-account/settings-delete-account.component";
import { MatDialog } from "@angular/material/dialog";

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
  public languageOptions = LANGUAGE_OPTIONS;
  public themeOptions = THEME_OPTIONS;

  public settingsForm = new FormGroup({
    usernameCtrl: new FormControl("", Validators.required),
    emailCtrl: new FormControl("", Validators.required),
    // password: new FormControl("", Validators.required),
  });

  public appSettingsForm = new FormGroup({
    themeCtrl: new FormControl("light", Validators.required),
    languageCtrl: new FormControl("en", Validators.required),
    notificationsCtrl: new FormControl(false),
  });

  @ViewChild("username") username: ElementRef;
  @ViewChild("email") email: ElementRef;

  constructor(
    private profileStoreService: ProfileStoreService,
    private el: ElementRef,
    private settingsStoreService: SettingsStoreService,
    private themeService: ThemeService,
    private translateService: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.profileStoreService
      .getProfile()
      .pipe(
        filter((state) => state != null),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((user: Profile) => {
        this.userId = user._id;

        this.updateSettingsForm({
          username: user.username,
          email: user.email,
          theme: user.theme,
          preferredLanguage: user.preferredLanguage,
          notifications: user.notifications,
        });
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateSettingsForm(settings: any) {
    if (settings) {
      console.log(settings);
      this.settingsForm.patchValue({
        usernameCtrl: settings.username,
        emailCtrl: settings.email,
        // password: settings.password,
      });

      this.appSettingsForm.patchValue({
        themeCtrl: settings.theme,
        languageCtrl: settings.preferredLanguage,
        notificationsCtrl: settings.notifications,
      });
    }
  }

  updateTheme(value: any) {
    this.themeService.updateTheme(value);
    this.settingsStoreService.updateSettings(this.userId, {
      theme: this.appSettingsForm.value.themeCtrl,
    });
  }

  updateLanguage(value: any) {
    this.translateService.use(value);
    this.settingsStoreService.updateSettings(this.userId, {
      preferredLanguage: this.appSettingsForm.value.languageCtrl,
    });
  }

  updateNotifications(value: any) {
    this.settingsStoreService.updateSettings(this.userId, {
      notifications: this.appSettingsForm.value.notificationsCtrl,
    });
  }

  deleteAccount(): void {
    const dialogRef = this.dialog.open(SettingsDeleteAccountComponent, {
      width: "50vw",
    });

    dialogRef.afterClosed().subscribe((confirmed: any) => {
      if (confirmed) console.log("DELETE ACCOUNT");
      else console.log("DON'T DELETE");
    });
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
      });
    } else {
      this.focusError();
    }
  }
}

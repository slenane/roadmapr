import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { Settings } from "../store/settings.models";
import { SettingsStoreService } from "../services/settings-store.service";
import { filter, takeUntil } from "rxjs/operators";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ThemeService } from "src/app/core/services/theme.service";
import { THEME_OPTIONS } from "src/app/core/constants/theme.constants";
import { LANGUAGE_OPTIONS } from "../constants/settings.constants";
import { TranslateService } from "@ngx-translate/core";
import { SettingsDeleteAccountComponent } from "./settings-delete-account/settings-delete-account.component";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public settings: Settings;

  public languageOptions = LANGUAGE_OPTIONS;
  public themeOptions = THEME_OPTIONS;

  public isEditingName: boolean = false;
  public isEditingUsername: boolean = false;
  public isEditingEmail: boolean = false;
  public isEditingPassword: boolean = false;

  public nameForm = new FormGroup({
    firstNameCtrl: new FormControl(
      { value: "", disabled: !this.isEditingName },
      Validators.required
    ),
    lastNameCtrl: new FormControl(
      { value: "", disabled: !this.isEditingName },
      Validators.required
    ),
  });
  public appSettingsForm = new FormGroup({
    themeCtrl: new FormControl("light", Validators.required),
    languageCtrl: new FormControl("en", Validators.required),
    notificationsCtrl: new FormControl(false),
  });

  @ViewChild("firstName") firstNameCtrl: ElementRef;
  @ViewChild("lastName") lastNameCtrl: ElementRef;
  @ViewChild("username") usernameCtrl: ElementRef;
  @ViewChild("email") emailCtrl: ElementRef;
  @ViewChild("newPassword") newPasswordCtrl: ElementRef;
  @ViewChild("newPasswordConfirm") newPasswordConfirmCtrl: ElementRef;

  constructor(
    private settingsStoreService: SettingsStoreService,
    private themeService: ThemeService,
    private translateService: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.settingsStoreService
      .getSettings()
      .pipe(
        filter((state) => state != null),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((settings: Settings) => {
        this.settings = settings;
        this.updateForms();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateForms() {
    this.nameForm.patchValue({
      firstNameCtrl: this.settings.firstName,
      lastNameCtrl: this.settings.lastName,
    });

    this.appSettingsForm.patchValue({
      themeCtrl: this.settings.theme,
      languageCtrl: this.settings.preferredLanguage,
      notificationsCtrl: this.settings.notifications,
    });
  }

  toggleNameUpdate(): void {
    this.isEditingName = !this.isEditingName;
    if (this.isEditingName) {
      this.nameForm.controls.firstNameCtrl.enable();
      this.nameForm.controls.lastNameCtrl.enable();
    } else {
      this.nameForm.reset();
      this.nameForm.patchValue({
        firstNameCtrl: this.settings.firstName,
        lastNameCtrl: this.settings.lastName,
      });
      this.nameForm.controls.firstNameCtrl.disable();
      this.nameForm.controls.lastNameCtrl.disable();
    }
  }

  toggleUsernameUpdate() {
    this.isEditingUsername = !this.isEditingUsername;
  }

  toggleEmailUpdate() {
    this.isEditingEmail = !this.isEditingEmail;
  }

  togglePasswordUpdate() {
    this.isEditingPassword = !this.isEditingPassword;
  }

  onSaveName(): void {
    if (
      this.nameForm.valid &&
      (this.nameForm.value.firstNameCtrl !== this.settings.firstName ||
        this.nameForm.value.lastNameCtrl !== this.settings.lastName)
    ) {
      this.settingsStoreService.updateSettings(this.settings.userId, {
        firstName: this.nameForm.value.firstNameCtrl,
        lastName: this.nameForm.value.lastNameCtrl,
      });
      this.toggleNameUpdate();
    }
  }

  onSaveUsername(username: string): void {
    if (username !== this.settings.username) {
      this.settingsStoreService.updateSettings(this.settings.userId, {
        username,
      });
      this.toggleUsernameUpdate();
    }
  }

  onSaveEmail(email: string): void {
    if (email !== this.settings.email) {
      this.settingsStoreService.updateSettings(this.settings.userId, {
        email,
      });
      this.toggleEmailUpdate();
    }
  }

  onSavePassword(password: string): void {
    this.settingsStoreService.updatePassword(this.settings.userId, password);
    this.togglePasswordUpdate();
  }

  deleteAccount(): void {
    const dialogRef = this.dialog.open(SettingsDeleteAccountComponent, {
      width: "50vw",
    });

    dialogRef.afterClosed().subscribe((confirmed: any) => {
      if (confirmed) {
        this.settingsStoreService.deleteAccount();
      }
    });
  }

  updateTheme(value: any) {
    this.themeService.updateTheme(value);
    this.settingsStoreService.updateSettings(this.settings.userId, {
      theme: this.appSettingsForm.value.themeCtrl,
    });
  }

  updateLanguage(value: any) {
    this.translateService.use(value);
    this.settingsStoreService.updateSettings(this.settings.userId, {
      preferredLanguage: this.appSettingsForm.value.languageCtrl,
    });
  }

  updateNotifications(value: any) {
    this.settingsStoreService.updateSettings(this.settings.userId, {
      notifications: this.appSettingsForm.value.notificationsCtrl,
    });
  }
}

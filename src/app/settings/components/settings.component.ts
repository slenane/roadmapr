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
import { ValidatorsService } from "src/app/shared/services/validators.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public filterType = "date";
  public settings: Settings;
  public languageOptions = LANGUAGE_OPTIONS;
  public themeOptions = THEME_OPTIONS;
  public isEditingDetails: boolean = false;
  public isEditingUsername: boolean = false;
  public isEditingPassword: boolean = false;

  public settingsForm = new FormGroup({
    nameCtrl: new FormControl(
      { value: "", disabled: !this.isEditingDetails },
      Validators.required
    ),
    usernameCtrl: new FormControl(
      { value: "", disabled: !this.isEditingDetails },
      [Validators.required]
    ),
    emailCtrl: new FormControl(
      { value: "", disabled: !this.isEditingDetails },
      [Validators.required, Validators.email]
    ),
  });

  public appSettingsForm = new FormGroup({
    themeCtrl: new FormControl("light", Validators.required),
    languageCtrl: new FormControl("en", Validators.required),
    notificationsCtrl: new FormControl(false),
  });

  @ViewChild("name") nameCtrl: ElementRef;
  @ViewChild("username") usernameCtrl: ElementRef;
  @ViewChild("email") emailCtrl: ElementRef;
  @ViewChild("newPassword") newPasswordCtrl: ElementRef;
  @ViewChild("newPasswordConfirm") newPasswordConfirmCtrl: ElementRef;

  constructor(
    private el: ElementRef,
    private settingsStoreService: SettingsStoreService,
    private themeService: ThemeService,
    private translateService: TranslateService,
    private validatorsService: ValidatorsService,
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
        this.updateSettingsForm();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateSettingsForm() {
    this.settingsForm.patchValue({
      nameCtrl: this.settings.name,
      emailCtrl: this.settings.email,
    });

    this.settingsForm.controls.emailCtrl.addAsyncValidators([
      this.validatorsService.validateEmail(this.settings.email),
    ]);

    this.appSettingsForm.patchValue({
      themeCtrl: this.settings.theme,
      languageCtrl: this.settings.preferredLanguage,
      notificationsCtrl: this.settings.notifications,
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

  onEditDetailsClick(): void {
    this.isEditingDetails = !this.isEditingDetails;
    if (this.isEditingDetails) {
      this.settingsForm.controls.nameCtrl.enable();
      this.settingsForm.controls.emailCtrl.enable();
    } else {
      this.settingsForm.patchValue({
        nameCtrl: this.settings.name,
        emailCtrl: this.settings.email,
      });
      this.settingsForm.controls.nameCtrl.disable();
      this.settingsForm.controls.emailCtrl.disable();
    }
  }

  onSaveClick(): void {
    if (this.settingsForm.status === "VALID") {
      this.settingsStoreService.updateSettings(this.settings.userId, {
        name: this.settingsForm.value.nameCtrl,
        email: this.settingsForm.value.emailCtrl,
      });
    } else {
      this.focusError();
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

  onSavePassword(): void {}

  toggleUsernameUpdate() {
    this.isEditingUsername = !this.isEditingUsername;
  }

  togglePasswordUpdate() {
    this.isEditingPassword = !this.isEditingPassword;
  }
}

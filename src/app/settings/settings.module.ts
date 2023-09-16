import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { SettingsComponent } from "./components/settings.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { SettingsStoreService } from "./services/settings-store.service";
import { SettingsService } from "./services/settings.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromSettings from "./store/settings.reducer";
import { SettingsEffects } from "./store/settings.effects";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SettingsComponent],
  exports: [SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature("settings", fromSettings.reducer),
    EffectsModule.forFeature([SettingsEffects]),
    TranslateModule.forChild(),
  ],
  providers: [SettingsStoreService, SettingsService],
})
export class SettingsModule {}

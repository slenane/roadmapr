import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./components/dashboard.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { DashboardStoreService } from "./services/dashboard-store.service";
import { DashboardService } from "./services/dashboard.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromDashboard from "./store/dashboard.reducer";
import { DashboardEffects } from "./store/dashboard.effects";
import { DashboardStackComponent } from "./components/dashboard-stack/dashboard-stack.component";
import { DashboardSkillDistributionComponent } from "./components/dashboard-skill-distribution/dashboard-skill-distribution.component";
import { DashboardGithubComponent } from "./components/dashboard-github/dashboard-github.component";
import { DashboardFiltersComponent } from './components/dashboard-filters/dashboard-filters.component';
import { DashboardTimelineComponent } from './components/dashboard-timeline/dashboard-timeline.component';
import { DashboardStackRadarComponent } from './components/dashboard-stack-radar/dashboard-stack-radar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardStackComponent,
    DashboardSkillDistributionComponent,
    DashboardGithubComponent,
    DashboardFiltersComponent,
    DashboardTimelineComponent,
    DashboardStackRadarComponent,
  ],
  exports: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature("dashboard", fromDashboard.reducer),
    EffectsModule.forFeature([DashboardEffects]),
  ],
  providers: [DashboardStoreService, DashboardService],
})
export class DashboardModule {}

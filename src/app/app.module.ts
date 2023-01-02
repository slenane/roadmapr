import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './shared/components/menu/menu.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { LandingComponent } from './landing/landing.component';
import { RoadmapComponent } from './roadmap/components/roadmap.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { EmploymentComponent } from './employment/employment.component';
import { SettingsComponent } from './settings/settings.component';
import { RoadmapItemComponent } from './roadmap/components/roadmap-item/roadmap-item.component';
import { ApiService } from './core/services/api.service';
import { UrlService } from './core/services/url.service';
import { RoadmapService } from './roadmap/services/roadmap.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RoadmapStatisticsComponent } from './roadmap/components/roadmap-statistics/roadmap-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SidebarComponent,
    LandingComponent,
    RoadmapComponent,
    DashboardComponent,
    ProfileComponent,
    EmploymentComponent,
    SettingsComponent,
    RoadmapItemComponent,
    RoadmapStatisticsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule
  ],
  providers: [
    ApiService,
    UrlService,
    RoadmapService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

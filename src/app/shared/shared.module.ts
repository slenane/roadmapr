import { NgModule } from "@angular/core";
import { MenuComponent } from "./components/navigation/menu/menu.component";
import { SidebarComponent } from "./components/navigation/sidebar/sidebar.component";
import { StackSelectorComponent } from "./components/stack-selector/stack-selector.component";
import { LineChartComponent } from "./components/charts/line-chart/line-chart.component";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [
    LineChartComponent,
    MenuComponent,
    SidebarComponent,
    StackSelectorComponent,
  ],
  exports: [
    LineChartComponent,
    MenuComponent,
    SidebarComponent,
    StackSelectorComponent,
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
  ],
})
export class SharedModule {}

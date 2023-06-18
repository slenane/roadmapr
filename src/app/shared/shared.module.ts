import { NgModule } from "@angular/core";
import { MenuComponent } from "./components/navigation/menu/menu.component";
import { SidebarComponent } from "./components/navigation/sidebar/sidebar.component";
import { StackSelectorComponent } from "./components/stack-selector/stack-selector.component";
// import { ChartComponent } from "./components/charts/chart.component";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
// import { NgChartsModule } from "ng2-charts";
// import { FileUploadComponent } from "./components/file-upload/file-upload.component";

@NgModule({
  declarations: [
    // ChartComponent,
    // FileUploadComponent,
    MenuComponent,
    SidebarComponent,
    StackSelectorComponent,
  ],
  exports: [
    // ChartComponent,
    // FileUploadComponent,
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
    // NgChartsModule,
  ],
})
export class SharedModule {}

import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatMenuModule } from "@angular/material/menu";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatTreeModule } from "@angular/material/tree";
import { MatSliderModule } from "@angular/material/slider";

@NgModule({
  exports: [
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
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatMenuModule,
    DragDropModule,
    MatProgressBarModule,
    CdkTreeModule,
    MatTreeModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [],
})
export class MaterialModule {}

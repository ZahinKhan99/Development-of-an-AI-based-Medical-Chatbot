import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterLink} from "@angular/router";
import {DndDirective} from './directives/dnd.directive';
import {AnalysisModalComponent} from './analysis-modal/analysis-modal.component';
import {DialogModule} from "primeng/dialog";
import {RecordModalComponent} from './record-modal/record-modal.component';
import {ProgressCardComponent} from './progress-card/progress-card.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    SidebarComponent,
    DndDirective,
    AnalysisModalComponent,
    RecordModalComponent,
    ProgressCardComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    DialogModule,
    ProgressSpinnerModule
  ], exports: [
    SidebarComponent,
    DndDirective,
    AnalysisModalComponent,
    RecordModalComponent,
    ProgressCardComponent
  ]
})
export class SharedModule {
}

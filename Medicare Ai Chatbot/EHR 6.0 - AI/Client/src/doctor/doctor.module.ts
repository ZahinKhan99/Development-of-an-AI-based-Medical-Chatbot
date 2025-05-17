import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DoctorRoutingModule} from './doctor-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ConsultComponent} from './consult/consult.component';
import {ViewRecordComponent} from './view-record/view-record.component';
import {SharedModule} from "../shared/shared.module";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {CardModule} from "primeng/card";
import {RippleModule} from "primeng/ripple";


@NgModule({
  declarations: [
    DashboardComponent,
    ConsultComponent,
    ViewRecordComponent, DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    InputTextModule,
    SharedModule,
    TableModule,
    TagModule,
    InputTextareaModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    CardModule,
    RippleModule
  ]
})
export class DoctorModule {
}

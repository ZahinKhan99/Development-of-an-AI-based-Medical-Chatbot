import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatientRoutingModule} from './patient-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ViewRecordComponent} from './view-record/view-record.component';
import {RecordAccessComponent} from './record-access/record-access.component';
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {SharedModule} from "../shared/shared.module";
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppointmentComponent } from './appointment/appointment.component';
import {DropdownModule} from "primeng/dropdown";
import { PredictDiseaseComponent } from './predict-disease/predict-disease.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ViewRecordComponent,

    RecordAccessComponent,
     DashboardHomeComponent,
     AppointmentComponent,
     PredictDiseaseComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    InputTextModule,
    TableModule,
    TagModule,
    CardModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule
  ]
})
export class PatientModule {
}

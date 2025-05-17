import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ViewRecordComponent} from "./view-record/view-record.component";
import {RecordAccessComponent} from "./record-access/record-access.component";
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {AppointmentComponent} from "./appointment/appointment.component";
import {PredictDiseaseComponent} from "./predict-disease/predict-disease.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: 'dashboard', component: DashboardHomeComponent},
      {path: 'view-record', component: ViewRecordComponent},
      {path: 'record-access', component: RecordAccessComponent},
      {path: 'appointments', component: AppointmentComponent},
      {path: 'predict-disease', component: PredictDiseaseComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {
}

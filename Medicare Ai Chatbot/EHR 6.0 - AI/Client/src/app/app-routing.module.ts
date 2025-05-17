import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthenticationComponent} from "./authentication/authentication.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: AuthenticationComponent
  },
  {
    path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'doctor', loadChildren: () => import('../doctor/doctor.module').then(m => m.DoctorModule)
  },
  {
    path: 'patient', loadChildren: () => import('../patient/patient.module').then(m => m.PatientModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

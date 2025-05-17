import {Component, OnInit} from '@angular/core';
import {UserType} from "../../types/user.type";
import {PatientService} from "../services/patient.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.sass']
})
export class DashboardHomeComponent implements OnInit {

  patient!: UserType
  showEditDialog: boolean = false;

  constructor(private ps: PatientService, private as: AuthService) {
  }

  ngOnInit() {
    this.getPatientDetails()
  }

  getPatientDetails() {
    this.ps.getPatientDetails(this.as.account()).subscribe({
      next: (result: any) => {
        console.log(result)
        this.patient = result.data
      }
    })
  }

  updatePatientData() {
    this.ps.editPatient(this.patient.id, this.patient).subscribe({
      next: (result: any) => {
        console.log(result)
        this.showEditDialog = false
      }, error: (err: any) => {
        console.log(err)
      }
    })
  }
}

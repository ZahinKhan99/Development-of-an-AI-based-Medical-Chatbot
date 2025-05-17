import {Component, OnInit} from '@angular/core';
import {UserType} from "../../types/user.type";
import {AuthService} from "../../services/auth.service";
import {DoctorService} from "../services/doctor.service";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.sass']
})
export class DashboardHomeComponent implements OnInit {

  doctor: UserType = {age: 0, blood_group: "", email: "", id: "", name: "", phone: ""}
  isEdit: boolean = false;

  constructor(private ds: DoctorService, private as: AuthService) {
  }

  ngOnInit() {
    this.getDoctorDetails()
  }

  getDoctorDetails() {
    this.ds.getDoctorDetails(this.as.account()).subscribe({
      next: (result: any) => {
        console.log(result)
        this.doctor = result.data
      }
    })
  }

  updateDoctorData() {
    this.ds.editDoctor(this.doctor.id, this.doctor).subscribe({
      next: (result: any) => {
        console.log(result)
        this.isEdit = false
      }, error: (err: any) => {
        console.log(err)
      }
    })
  }
}

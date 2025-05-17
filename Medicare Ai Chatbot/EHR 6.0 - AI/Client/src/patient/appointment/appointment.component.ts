import {Component, OnInit, ViewChild} from '@angular/core';
import {UserType} from "../../types/user.type";
import {SharedUserService} from "../../shared/services/shared-user.service";
import {DepartmentType} from "../../types/department.type";
import {PatientService} from "../services/patient.service";
import {AppointmentType} from "../../types/appointment.type";
import {ProgressCardComponent} from "../../shared/progress-card/progress-card.component";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.sass']
})
export class AppointmentComponent implements OnInit {
  @ViewChild(ProgressCardComponent) prgCard!: ProgressCardComponent;
  appointment: AppointmentType = {dateTime: "", department: 0, doctor: null, patient: null, status: false}
  appointments: AppointmentType[] = []
  today = new Date().toISOString().slice(0, 16)
  addDialog: boolean = false;
  Doctors: UserType[] = [];
  selectedDoctor!: UserType;
  Departments: DepartmentType[] = [];
  selectedDept!: DepartmentType;
  private isUpdateAppointment: boolean = false;

  constructor(private ps: PatientService, private sus: SharedUserService) {

  }

  ngOnInit() {
    this.getAllDoctors()
    this.getAllDepartments()
    this.getAllAppointments()
  }

  getAllDoctors() {
    this.sus.getAllDoctors().subscribe({
      next: (result: any) => {
        console.log(result)
        this.Doctors = result.data
      }
    })
  }

  getAllDepartments() {
    this.sus.getDepartments().subscribe({
      next: (result) => {
        console.log(result)
        this.Departments = result.departments
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  getAllAppointments() {
    this.sus.getAllAppointments().subscribe({
      next: (result) => {
        this.appointments = result.data
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  addNewAppointment() {
    this.appointment.patient = (JSON.parse(localStorage.getItem('user') || '') as UserType).id
    this.appointment.doctor = this.selectedDoctor.id
    this.appointment.status = false
    this.appointment.department = this.selectedDept.id
    this.addDialog = false
    if (!this.pastDatetimeValidator()) {
      this.prgCard.setProgress('Date Validation Failed', 3)
      return
    }

    if (this.isUpdateAppointment) {
      this.ps.updateAppointment(this.appointment, this.appointment.id || 0).subscribe({
        next: (result: any) => {
          this.prgCard.setProgress('Appointment Updated', 1)
          this.addDialog = false
          this.getAllAppointments()
        },
        error: (err: any) => {
          console.log(err)
          this.prgCard.setProgress('Failed Updating Appointment\n' + err.message, 3)
        }
      })
    } else {
      console.log(this.appointment)
      this.ps.addNewAppointment(this.appointment).subscribe({
        next: (result: any) => {
          this.prgCard.setProgress('Appointment Added Successfully', 1)
          this.addDialog = false
          this.getAllAppointments()
        },
        error: (err: any) => {
          console.log(err)
          this.prgCard.setProgress('Adding Appointment failed', 3)
        }
      })
    }
  }

  pastDatetimeValidator() {
    const selectedDatetime = new Date(this.appointment.dateTime);
    const currentDatetime = new Date();
    return selectedDatetime >= currentDatetime;
  }

  editAppointment(id: number) {
    this.addDialog = true
    console.log(this.appointments.filter(appointment => appointment.id === id)[0])
    this.appointment = this.appointments.filter(appointment => appointment.id === id)[0]
    this.isUpdateAppointment = true
  }


  removeAppointment(id: number) {
    this.ps.deleteAppointment(id).subscribe({
      next: (result: any) => {
        this.prgCard.setProgress('Deleted Appointment', 1)
        this.addDialog = false
        this.getAllAppointments()
      },
      error: (err: any) => {
        console.log(err)
        this.prgCard.setProgress('Failed deleting Appointment\n' + err.message, 3)
      }
    })
  }

  onAddAppointment() {
    this.addDialog = true
    this.isUpdateAppointment = false
  }
}

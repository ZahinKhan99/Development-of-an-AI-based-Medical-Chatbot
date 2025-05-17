import {Component, OnInit, ViewChild} from '@angular/core';
import {UserType} from "../../types/user.type";
import {UserService} from "../services/user.service";
import {ProgressCardComponent} from "../../shared/progress-card/progress-card.component";
import {AdminService} from "../services/admin.service";
import {DepartmentType} from "../../types/department.type";
import {SharedUserService} from "../../shared/services/shared-user.service";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.sass']
})
export class DoctorComponent implements OnInit {
  @ViewChild(ProgressCardComponent) prgCard!: ProgressCardComponent

  doctors: UserType[] = []
  isAddDrDialogVisible: boolean = false;
  dialogTitle: string = '';
  selectedDoctor: UserType = {
    age: 0, blood_group: "", email: "", id: "", name: "", phone: ""
  }
  departments: DepartmentType[] = []
  private editMode: boolean = false;
  selectedDepartment!: DepartmentType

  constructor(private us: UserService, private as: AdminService,private sus:SharedUserService) {
  }

  ngOnInit() {
    this.getAllDoctors()
    this.getDepartments()
  }

  getAllDoctors() {
    this.sus.getAllDoctors().subscribe({
      next: r => {
        this.doctors = r.data
      }, error: () => {

      }

    })
  }

  showAddDrDialog() {
    this.dialogTitle = 'Add New Doctor'
    this.isAddDrDialogVisible = true;
  }

  onEditDoctor(id: string) {
    this.selectedDoctor = this.doctors.find(doctor => doctor.id === id) as UserType
    this.isAddDrDialogVisible = true
    this.editMode = true
  }


  editDoctor() {
    this.prgCard.setProgress('Verifying Doctor...', 0)
    this.us.editDoctor(this.selectedDoctor.id, this.selectedDoctor).subscribe({
      next: r => {
        this.isAddDrDialogVisible = false
        this.prgCard.setProgress('Doctor Updated', 1)
        this.getAllDoctors()
      }, error: err => {
        this.prgCard.setProgress('Doctor update failed', 3)
      }
    })
  }

  removeDoctor(id: string) {
    this.prgCard.setProgress('Deactivating Doctor...', 0)
    this.us.removeDoctor(id).subscribe({
      next: (r) => {
        this.prgCard.setProgress('Doctor Removed', 1)
        this.getAllDoctors()
        this.isAddDrDialogVisible = false
      }
      , error: err => {
        this.prgCard.setProgress('Removal failed', 3)
      }
    })
  }

  addNewDoctor() {
    this.isAddDrDialogVisible = false
    console.log(this.selectedDoctor)
    this.selectedDoctor.user_type = "Doctor"
    this.selectedDoctor.department = this.selectedDepartment.id
    this.us.addDoctor(this.selectedDoctor).subscribe({
      next: (r) => {
        console.log(r)
        this.getAllDoctors()
      }, error: (err) => {
        console.log()
      }
    })
  }

  getDepartments() {
    this.sus.getDepartments().subscribe({
      next: r => {
        this.departments = r.departments
      }, error: err => {
        console.log(err)
      }
    })
  }

  addOrEditNewDoctor() {
    this.editMode ? this.editDoctor() : this.addNewDoctor()
  }
}

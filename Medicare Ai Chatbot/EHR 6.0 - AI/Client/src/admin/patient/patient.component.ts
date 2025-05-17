import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {UserType} from "../../types/user.type";
import {ProgressCardComponent} from "../../shared/progress-card/progress-card.component";
import {SharedUserService} from "../../shared/services/shared-user.service";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent implements OnInit {
  @ViewChild(ProgressCardComponent) prgCard!: ProgressCardComponent

  patients: UserType[] = []
  user!: UserType;
  showEditDialog: boolean = false;

  constructor(private us: UserService,private sus:SharedUserService) {
  }

  ngOnInit() {
    this.getAllPatients()
  }

  getAllPatients() {
    this.sus.getAllPatients().subscribe({
      next: r => {
        this.patients = r.data
      }, error: err => {
        console.log(err)
      }
    })
  }


  onEditPatient(id: string) {
    this.user = this.patients.find(patient => patient.id === id) as UserType
    this.showEditDialog = true
  }

  updatePatientData() {
    this.prgCard.setProgress('Verifying Patient...', 0)
    this.us.editPatient(this.user.id, this.user).subscribe({
      next: (r) => {
        this.showEditDialog = false
        this.prgCard.setProgress('Patient Updated', 1)
        this.getAllPatients()
      }
      , error: err => {
        this.prgCard.setProgress('Update failed', 3)
      }
    })
  }

  deactivatePatient(id: string) {
    this.prgCard.setProgress('Deactivating Patient...', 0)
    this.us.removePatient(id).subscribe({
      next: () => {
        this.prgCard.setProgress('Patient removed', 1)
        this.getAllPatients()
      }, error: err => {
        this.prgCard.setProgress('Removal failed', 3)
      }
    })
  }
}

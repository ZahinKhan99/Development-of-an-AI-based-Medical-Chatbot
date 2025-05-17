import {Component, OnInit, ViewChild} from '@angular/core';
import {DoctorService} from "../services/doctor.service";
import {UserType} from "../../types/user.type";
import {MedicalDiagnosisType} from "../../types/medical-diagnosis.type";
import {RecordModalComponent} from "../../shared/record-modal/record-modal.component";
import {ProgressCardComponent} from "../../shared/progress-card/progress-card.component";
import {SharedUserService} from "../../shared/services/shared-user.service";
import {MedicalRecordType} from "../../types/medical-record.type";


@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.sass']
})
export class ViewRecordComponent implements OnInit {
  @ViewChild(ProgressCardComponent) prgCard!: ProgressCardComponent
  @ViewChild(RecordModalComponent) recordModal!: RecordModalComponent

  patients: UserType[] = []
  selectedPatient!: UserType;

  medicalRecord!: { [id: string]: MedicalRecordType [] }

  selectedPatientRecords!: MedicalRecordType[]
  selectedDiagnosis!: MedicalDiagnosisType;

  selectedRecord!: MedicalRecordType
  showRecordDialog: boolean = false;

  constructor(private ds: DoctorService, private sus: SharedUserService) {
  }

  ngOnInit() {
    this.getAllAssignedPatients()
  }

  getAllAssignedPatients() {
    this.sus.getAllPatients().subscribe({
      next: result => {
        this.patients = result.data
      },
      error: err => {
        console.log(err)
      }
    })
  }

  onViewRecord() {
    console.log(this.selectedPatient)
    this.getPatRecords()
  }

  getPatRecords() {
    if (this.medicalRecord?.[this.selectedPatient.id]) {
      this.selectedPatientRecords = this.medicalRecord[this.selectedPatient.id]
      return
    }

    this.ds.getPatientRecords(this.selectedPatient.id).subscribe({
      next: (result) => {
        this.medicalRecord = {[this.selectedPatient.id]: result.data}
        this.selectedPatientRecords = result.data
        console.log(result)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  viewDiagnosis(r: MedicalRecordType, d: MedicalDiagnosisType) {
    this.selectedRecord = r
    this.selectedDiagnosis = d
    this.recordModal.showDiagnosis = true
    this.showRecordDialog = true
    this.recordModal.setFiles(this.selectedRecord.files)
    console.log(this.selectedRecord)
  }


  protected readonly JSON = JSON;

}

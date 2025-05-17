import {Component, OnInit, ViewChild} from '@angular/core';
import {PatientService} from "../services/patient.service";
import {MrRecordType} from "../../types/mr-record.type";
import {InitialAnalysisType} from "../../types/initial-analysis.type";
import {AnalysisModalComponent} from "../../shared/analysis-modal/analysis-modal.component";
import {MedicalDiagnosisType} from "../../types/medical-diagnosis.type";
import {RecordModalComponent} from "../../shared/record-modal/record-modal.component";
import {AuthService} from "../../services/auth.service";
import {MedicalRecordType} from "../../types/medical-record.type";
import {UserType} from "../../types/user.type";

interface AnalysisType {
  bc_data: MrRecordType,
  ia_data: InitialAnalysisType
}

@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.sass']
})
export class ViewRecordComponent implements OnInit {

  @ViewChild(AnalysisModalComponent) analysisModal!: AnalysisModalComponent
  @ViewChild(RecordModalComponent) recordModal!: RecordModalComponent

  shoAnalysis: boolean = false
  analysis!: AnalysisType

  diagnosis: MedicalRecordType[] = []
  selectedDiagnosis!: MedicalDiagnosisType

  constructor(private ps: PatientService, private as: AuthService) {
  }

  ngOnInit() {
    this.getAnalysis()
    this.getRecords()
  }

  getAnalysis() {
    this.ps.getPatAnalysis().then(r => {
      console.log(r)
      this.analysis = r
    })
  }

  getRecords() {
    this.ps.getPatientRecords(this.as.account()).subscribe({
      next: (result: any) => {
        console.log(result)
        this.diagnosis = result.data
      },
      error: err => {
        console.log(err)
      }
    })
  }

  showDialog(d: MedicalDiagnosisType | string) {
    this.recordModal.showDiagnosis = true
    this.selectedDiagnosis = d as MedicalDiagnosisType
  }

  showAnalysisDialog() {
    this.analysisModal.showAnalysis = true
  }

  getDocName(doctor: UserType | string | null) {
    return (doctor as UserType).name;
  }
}

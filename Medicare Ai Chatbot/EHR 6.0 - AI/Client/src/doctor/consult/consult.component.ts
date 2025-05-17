import {Component, OnInit, ViewChild} from '@angular/core';
import {UserType} from "../../types/user.type";
import {DoctorService} from "../services/doctor.service";
import {MrRecordType} from "../../types/mr-record.type";
import {InitialAnalysisType} from "../../types/initial-analysis.type";
import {AnalysisModalComponent} from "../../shared/analysis-modal/analysis-modal.component";
import {formatBytes} from "../../shared/utills";
import {MedicalDiagnosisType} from "../../types/medical-diagnosis.type";
import {MedicineType} from "../../types/medicine.type";
import {ProgressCardComponent} from "../../shared/progress-card/progress-card.component";
import {AppointmentType} from "../../types/appointment.type";
import {SharedUserService} from "../../shared/services/shared-user.service";
import {MedicalRecordType} from "../../types/medical-record.type";

interface AnalysisType {
  bc_data: MrRecordType,
  ia_data: InitialAnalysisType
}

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.sass']
})
export class ConsultComponent implements OnInit {
  @ViewChild(ProgressCardComponent) prgCard!: ProgressCardComponent
  @ViewChild(AnalysisModalComponent) analysisModal!: AnalysisModalComponent

  patients: UserType[] = []

  patInitialAnalysis!: { [id: string]: AnalysisType }

  analysis !: AnalysisType

  showDiagnose: boolean = false

  medicalDiagnosis: MedicalDiagnosisType = {
    diagnosis: "", files: [], followup: "", medicines: [], tests: []
  }

  med: MedicineType = {
    dose: 0, frequency: "", name: "", noOfDays: 0, remarks: ""
  }
  test: string = '';
  selectedFiles: File[] = []
  selectedPatient!: UserType
  selectedAppointment!: AppointmentType

  appointments: AppointmentType[] = [];


  constructor(private ds: DoctorService, private sus: SharedUserService) {
  }

  ngOnInit() {
    // this.getAssignedPatients()
    this.getAllAppointments()
  }

  // getAssignedPatients() {
  //   this.ds.getDrAssignedPatients().then(r => {
  //     console.log(r)
  //     this.patients = r
  //   })
  // }

  checkHasRecordAccess() {
    this.prgCard.setProgress('Checking access to record', 0)
    this.showDiagnose = true
    this.prgCard.onClose()
    // this.ds.checkDocAccessToRecord(this.selectedPatient.id).then(r => {
    //   console.log(r)
    //   if (r) {
    //     this.prgCard.onClose()
    //     this.showDiagnose = true
    //   } else {
    //     this.prgCard.setProgress('No access to record', 3)
    //   }
    // })
  }

  onConsultPatient() {
    this.prgCard.setProgress('Adding patient diagnosis', 0)
    this.medicalDiagnosis.files = this.selectedFiles
    console.log(this.medicalDiagnosis)

    if (this.medicalDiagnosis.diagnosis === '') {
      this.prgCard.setProgress('Diagnosis shouldn\'t be empty', 3)
      return
    }
    // if (this.medicalDiagnosis.files.length === 0) {
    //   this.prgCard.setProgress('Select at-least one medical record', 3)
    //   return
    // }
    if (this.medicalDiagnosis.followup === '') {
      this.prgCard.setProgress('Select Followup', 3)
      return
    }

    let medicalRecord: MedicalRecordType = {
      doctor: (JSON.parse(localStorage.getItem('user') || '') as UserType).id,
      patient: this.selectedPatient.id,
      dateTime: '',
      medical_record: this.medicalDiagnosis,
      appointment: this.selectedAppointment.id as number
    }

    let data = new FormData()

    data.append('doctor', String(medicalRecord.doctor))
    data.append('patient', String(medicalRecord.patient))
    data.append('medical_record', JSON.stringify(this.medicalDiagnosis))
    data.append('appointment', String(medicalRecord.appointment))

    this.selectedFiles.forEach(file => {
      data.append('files', file)
    })

    this.ds.addPatientRecord(data)
      .subscribe({
        next: (result: any) => {
          this.prgCard.setProgress('Diagnosis complete', 1)
          this.showDiagnose = false
          this.medicalDiagnosis = {
            diagnosis: "", files: [], followup: "", medicines: [], tests: []
          }
          console.log(result)
          this.getAllAppointments()
        },
        error: err => {
          console.log(err)
          this.prgCard.setProgress('Diagnosis Adding Failed', 3)
        }
      })
  }


  getInput(input: Event) {
    return (input.target as HTMLInputElement).value
  }

  // onViewAnalysis(p: UserType) {
  //   // console.log(p)
  //   this.analysisModal.showAnalysis = true
  //   if (this.patInitialAnalysis?.[p.id]) {
  //     this.analysis = this.patInitialAnalysis[p.id]
  //     return
  //   }
  //   this.ds.getAnalysisPatient(p.id).then((r: AnalysisType) => {
  //     console.log(r)
  //     this.patInitialAnalysis = {[p.id]: r}
  //     this.analysis = this.patInitialAnalysis[p.id]
  //     console.log(this.analysis)
  //   })
  // }

  onDiagnose(p: AppointmentType) {
    console.log(p)
    this.selectedPatient = p.patient as UserType
    this.selectedAppointment = p
    this.checkHasRecordAccess()
  }

  onMedicinesSave() {
    if (this.med.name === '') return
    if (this.med.dose < 1) return;
    if (this.med.frequency === '') return;
    if (this.med.noOfDays < 1) return;
    this.medicalDiagnosis.medicines.push(this.med)
    this.med = {
      dose: 0, frequency: "", name: "", noOfDays: 0, remarks: ""
    }
  }

  onTestSave() {
    if (this.test === '') return
    this.medicalDiagnosis.tests.push(this.test)
    this.test = ''
  }

  onFilesSelected(event: Event) {
    console.log()
    let files: FileList = (event.target as HTMLInputElement).files as FileList
    for (let i = 0; i < files.length; i++) {
      if (files.item(i) != null)
        this.selectedFiles.push(files.item(i) as File)
    }
  }

  onFileDrop(event: FileList) {
    console.log(event)
    for (let i = 0; i < event.length; i++) {
      if (event.item(i) != null)
        this.selectedFiles.push(event.item(i) as File)
    }
  }

  getAllAppointments() {
    this.ds.getDoctorAppointments().subscribe({
        next: (result) => {
          this.appointments = result.data

        },
        error(error: any) {
          console.log(error)
        }
      }
    )
  }

  protected readonly formatBytes = formatBytes;
}

import {Injectable} from '@angular/core';
import {BCUserReturnType, UserType} from "../../types/user.type";
import {MrRecordType} from "../../types/mr-record.type";
import {InitialAnalysisType} from "../../types/initial-analysis.type";
import {LabFileType} from "../../types/lab-file.type";
import {MappedMedicalRecordType} from "../../types/mapped-medical-record.type";
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {DepartmentType} from "../../types/department.type";
import {AppointmentType} from "../../types/appointment.type";


@Injectable({
  providedIn: 'root'
})
export class SharedUserService {

  constructor(private http: HttpClient) {
  }

  getDepartments() {
    return this.http.get<{ "departments": DepartmentType[] }>(`${environment.API_URL}departments/`);
  }


  getAllPatients() {
    return this.http.get<{ data: UserType[] }>(`${environment.API_URL}auth/patients/`)
  }

  getAllDoctors() {
    return this.http.get<{ data: UserType[] }>(`${environment.API_URL}auth/doctors/`)
  }

  getAllAppointments() {
    return this.http.get<{ data: AppointmentType[] }>(`${environment.API_URL}appointment/`)
  }

  getUser(id: string): Promise<UserType> {
    return new Promise<UserType>((resolve, reject) => {

    })
  }


  mapUsers(ur: BCUserReturnType[]): Promise<UserType[]> {
    let users: UserType[] = []
    return new Promise<UserType[]>((resolve, reject) => {

    })
  }

  mapUser(u: BCUserReturnType): Promise<UserType> {
    return new Promise<UserType>((resolve, reject) => {

    })
  }

//


  getAnalysisByPatient(pat: string): Promise<{
    bc_data: MrRecordType,
    ia_data: InitialAnalysisType
  }> {
    let IA: {
      bc_data: MrRecordType,
      ia_data: InitialAnalysisType
    } = {
      bc_data: {
        mid: 0,
        drId: '',
        recordHash: '',
        date: 0
      },
      ia_data: {
        patient: undefined,
        diagnosis: '',
        fdr: ''
      }
    }
    return new Promise((resolve, reject) => {

    })
  }

  getMedicalRecordByPatient(pat: string): Promise<MappedMedicalRecordType[]> {
    let records: MappedMedicalRecordType[] = []
    return new Promise((resolve, reject) => {

    })
  }


  checkDocAccessToPatRecord(pat: string, doc: string): Promise<boolean> {
    console.log(pat, doc)
    return new Promise<boolean>((resolve, reject) => {

    })
  }

  prepareFilesForIAAndDiagnose(files: File[]): Promise<LabFileType[]> {

    return new Promise((resolve, reject) => {

    })
  }
}

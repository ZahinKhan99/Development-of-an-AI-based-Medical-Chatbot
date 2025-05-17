import {Injectable} from '@angular/core';
import {SharedUserService} from "../../shared/services/shared-user.service";
import {UserType} from "../../types/user.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {AppointmentType} from "../../types/appointment.type";
import {MedicalRecordType} from "../../types/medical-record.type";
import {PredictionType} from "../../types/prediction.type";

interface DocWithAccessType {
  doc: UserType,
  access: boolean
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {


  constructor(private us: SharedUserService, private http: HttpClient) {
  }

  getAllDoctors(): Promise<DocWithAccessType[]> {
    let docs: DocWithAccessType[] = []
    return new Promise((resolve, reject) => {

    })
  }

  getPatientDetails(id: string) {
    return this.http.get(`${environment.API_URL}auth/patients/${id}`)
  }

  getPatientRecords(pat: string) {
    return this.http.get<{ data: MedicalRecordType[] }>(`${environment.API_URL}medical_records/${pat}/`)
  }

  editPatient(id: string, data: UserType) {
    return this.http.put(`${environment.API_URL}auth/patients/${id}`, data)
  }

  getAllRecords(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

    })
  }

  addNewAppointment(data: AppointmentType) {
    return this.http.post(`${environment.API_URL}appointment/`, data)
  }

  updateAppointment(data: AppointmentType, id: number) {
    return this.http.put(`${environment.API_URL}appointment/${id}/`, data)
  }

  deleteAppointment(id: number) {
    return this.http.delete(`${environment.API_URL}appointment/${id}/`)
  }

  getPatAnalysis() {
    return new Promise<any>((resolve, reject) => {

    })
  }


  grantAccessToRecord(doc: string) {
    return new Promise((resolve, reject) => {

    })
  }

  revokeAccessToRecord(doc: string) {
    return new Promise((resolve, reject) => {

    })
  }

  getSymptoms() {
    return this.http.get<{ symptoms: string[] }>(`${environment.API_URL}symptoms/`)
  }

  predictDisease(symptoms: string[]) {
    return this.http.post<{ prediction: PredictionType }>(`${environment.API_URL}ai/predict`, {symptoms: symptoms})
  }
}

import {Injectable} from '@angular/core';
import {UserType} from "../../types/user.type";
import {MrRecordType} from "../../types/mr-record.type";
import {InitialAnalysisType} from "../../types/initial-analysis.type";
import {MappedMedicalRecordType} from "../../types/mapped-medical-record.type";
import {HttpClient} from "@angular/common/http";
import {MedicalRecordType} from "../../types/medical-record.type";
import {environment} from "../../environments/environment.development";
import {AppointmentType} from "../../types/appointment.type";
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  account: string = ''

  constructor(private as: AuthService, private http: HttpClient) {

  }

  getDrAssignedPatients(): Promise<UserType[]> {
    let pats: UserType[] = []
    return new Promise((resolve, reject) => {

    })
  }

  addPatientRecord(data: FormData) {
    return this.http.post(`${environment.API_URL}medical_records/`, data)
  }

  checkDocAccessToRecord(pat: string) {
    return new Promise((resolve, reject) => {

    })
  }

  getAnalysisPatient(pat: string): Promise<{
    bc_data: MrRecordType,
    ia_data: InitialAnalysisType
  }> {
    return new Promise((resolve, reject) => {

    })
  }

  getPatientRecords(pat: string) {
    return this.http.get<{ data: MedicalRecordType[] }>(`${environment.API_URL}medical_records/${pat}/`)
  }

  mintNewNFT(milestone: string, record: MappedMedicalRecordType, pat: string) {
    return new Promise((resolve, reject) => {

    })
  }

  getNFT(tokenId: number): Promise<any> {
    return new Promise((resolve, reject) => {
    })
  }

  getDoctorDetails(id: string) {
    return this.http.get(`${environment.API_URL}auth/doctors/${id}/`)
  }

  getDoctorAppointments() {
    return this.http.get<{
      data: AppointmentType[]
    }>(`${environment.API_URL}appointment/doctor/${this.as.account()}/`)
  }

  editDoctor(id: string, data: UserType) {
    return this.http.put(`${environment.API_URL}auth/doctors/${id}`, data)
  }

}

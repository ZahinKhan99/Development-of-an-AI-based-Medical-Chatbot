import {Injectable} from '@angular/core';
import {UserType} from "../../types/user.type";
import {SharedUserService} from "../../shared/services/shared-user.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  account: string | undefined

  constructor(private sus: SharedUserService, private http: HttpClient) {

  }

  getAllRmo(): Promise<UserType[]> {
    return new Promise<UserType[]>((resolve, reject) => {
    })
  }


  editDoctor(id: string, data: UserType) {
    return this.http.put(`${environment.API_URL}auth/doctors/${id}`, data)
  }


  removeDoctor(id: string) {
    return this.http.delete(`${environment.API_URL}auth/doctors/${id}`)
  }

  editPatient(id: string, data: UserType) {
    return this.http.put(`${environment.API_URL}auth/patients/${id}`, data)
  }


  removePatient(id: string) {
    return this.http.delete(`${environment.API_URL}auth/patients/${id}`)
  }


  addDoctor(data: UserType) {
    return this.http.post(`${environment.API_URL}auth/register/`, data)
  }


}

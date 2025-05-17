import {Injectable} from '@angular/core';
import {UserType} from "../../types/user.type";
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }


  getAllPatients() {
    return this.http.get<{ data: UserType[] }>(`${environment.API_URL}auth/patients/`)
  }

  getAllDoctors() {
    return this.http.get<{ data: UserType[] }>(`${environment.API_URL}auth/doctors/`)
  }
}

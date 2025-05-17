import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {DepartmentType} from "../../types/department.type";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getAllCounts() {
    return this.http.get(`${environment.API_URL}get_counts/`);
  }


}

import {Injectable, signal, WritableSignal} from '@angular/core';
import {LoginType} from "../types/login.type";
import {BehaviorSubject} from "rxjs";
import {UserType} from "../types/user.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  account: WritableSignal<string> = signal('')

  accountSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    let user = localStorage.getItem('user');
    if (user) {
      this.account.set((JSON.parse(user) as UserType).id);
    }
  }

  login(data: LoginType) {
    return this.http.post(`${environment.API_URL}auth/login/`, data)
  }

  userRegistration(data: UserType) {
    return this.http.post(`${environment.API_URL}auth/register/`, data)
  }
}

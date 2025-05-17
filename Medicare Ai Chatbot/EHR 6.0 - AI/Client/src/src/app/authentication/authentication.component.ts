import {Component, OnInit, ViewChild} from '@angular/core';
import {UserType} from "../../types/user.type";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ProgressCardComponent} from "../../shared/progress-card/progress-card.component";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent implements OnInit {
  @ViewChild(ProgressCardComponent) prgCard!: ProgressCardComponent
  @ViewChild('regForm') regForm!: HTMLFormElement
  @ViewChild('loginForm') loginForm!: HTMLFormElement

  user: UserType = {
    age: null,
    email: "",
    id: "",
    name: "",
    password: "",
    phone: "",
    blood_group: ''
  }

  userType: {
    admin: boolean;
    patient: boolean;
    doctor: boolean;
  } = {
    admin: true,
    patient: false,
    doctor: false
  }

  isRegister: boolean = false;
  isLogin: boolean = true;
  password: string = 'admin'
  rPassword: string = '';

  userTypeId: number = 0

  constructor(private as: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    let u_type = Number(localStorage.getItem("user_type"));
    let user = localStorage.getItem("user");

    if (user) {
      this.handleLoginRoute(u_type)
    }
  }

  register() {
    this.isRegister = true
    this.isLogin = false
    this.onUserToggle(3)
  }

  login() {
    this.isLogin = true
    this.isRegister = false
  }

  onUserToggle(number: number) {
    this.errorMsg = ''
    this.successMsg = ''
    this.userTypeId = number - 1;
    switch (number) {
      case 1:
        this.userType.admin = true
        this.userType.doctor = false
        this.userType.patient = false
        break;
      case 2:
        this.userType.admin = false
        this.userType.doctor = true
        this.userType.patient = false
        break;
      case 3:
        this.userType.admin = false
        this.userType.doctor = false
        this.userType.patient = true
        break;
    }
  }

  errorMsg: string = '';
  successMsg: string = '';

  handleLogin() {
    this.prgCard.setProgress('Authenticating...', 0)
    console.log(this.user)
    this.errorMsg = ''
    this.user.password = this.password
    let user_type = this.userType.admin ? 'Admin' : this.userType.doctor ? 'Doctor' : 'Patient'
    this.as.login({email: this.user.id, password: this.user.password || '', user_type}).subscribe({
      next: (r: any) => {
        this.as.account.set(r.data.id)
        localStorage.setItem('user_type', String(this.userTypeId))
        localStorage.setItem('user', JSON.stringify(r.data))
        this.handleLoginRoute(this.userTypeId)
      },
      error: (err: any) => {
        console.log(err)
        this.prgCard.setProgress(err.error.error, 3)
      }
    })
    this.clearForm()
  }

  handleLoginRoute(user_type: number): void {
    if (user_type === 0) {
      this.router.navigate(['admin/']).then(r => {
      })
      return;
    } else if (user_type === 1) {
      this.router.navigate(['doctor/']).then(r => {
      })
      return;
    } else if (user_type === 2) {
      this.router.navigate(['patient/']).then(r => {
      })
      return;
    }
  }

  handleRegister() {
    this.prgCard.setProgress('Registering new User', 0)
    this.user.password = this.password
    this.errorMsg = ""
    this.user.user_type = 'Patient'
    this.as.userRegistration(this.user).subscribe({
      next: (r) => {
        this.successMsg = 'Registration successful'
        this.prgCard.setProgress('Registration successful', 1)
        this.clearForm()
      },
      error: (err) => {
        this.errorMsg = 'Registration failed'
        this.prgCard.setProgress('Registration failed', 3)
      }
    })
  }

  clearForm() {
    this.isLogin ? this.loginForm.reset() :
      this.regForm.reset()

  }
}

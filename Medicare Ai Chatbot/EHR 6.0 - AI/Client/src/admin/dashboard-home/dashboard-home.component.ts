import {Component, OnInit} from '@angular/core';
import {AdminService} from "../services/admin.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'admin-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.sass']
})
export class DashboardHomeComponent implements OnInit {

  counts: number[] = []
  cartTitles: string[] = ['Doctor', 'Patient', 'Initial Analysis', 'Diagnosis']

  constructor(private as: AdminService) {
  }

  ngOnInit() {
    this.getAllCountsFromBC()
  }

  getAllCountsFromBC() {
    this.as.getAllCounts().subscribe({
      next: (r:any) => {
        console.log(r)
        this.counts[0] = r.data.doctors
        this.counts[1] = r.data.patients
      }
    })
  }

  protected readonly Title = Title;
}

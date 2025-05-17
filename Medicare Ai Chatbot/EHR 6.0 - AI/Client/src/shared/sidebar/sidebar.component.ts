import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface SidebarNavItemType {
  title: string,
  icon: string,
  route: string,
  active: boolean
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  @Input() navs!: SidebarNavItemType[]
  @Input() title!: string
  @Input() titleIcon!:string
  @Output() onLogOut = new EventEmitter<string>()

  open: boolean = false;

  ngOnInit() {

  }

  logOut() {
    this.onLogOut.emit('')
  }
}

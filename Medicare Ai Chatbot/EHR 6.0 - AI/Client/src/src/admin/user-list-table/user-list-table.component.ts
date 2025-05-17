import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserType} from "../../types/user.type";
import {Table} from "primeng/table";

@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list-table.component.sass']
})
export class UserListTableComponent {

  @Input() users!: UserType[]
  @Input() title!: string
  @Output() edit: EventEmitter<string> = new EventEmitter<string>()
  @Output() remove: EventEmitter<string> = new EventEmitter<string>()

  getInput(input: Event) {
    return (input.target as HTMLInputElement).value
  }


  editUser(id: string | undefined) {
    this.edit.emit(id)
  }

  removeUser(id: string | undefined) {
    this.remove.emit(id)
  }

  clear(table: Table) {
    table.clear();
  }
}

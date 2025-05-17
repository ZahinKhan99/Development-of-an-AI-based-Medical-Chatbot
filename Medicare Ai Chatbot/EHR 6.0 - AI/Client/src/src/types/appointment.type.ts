import {UserType} from "./user.type";
import {DepartmentType} from "./department.type";

export interface AppointmentType {
  id?: number;
  dateTime: string;
  department: DepartmentType | number
  doctor: UserType | string | null;
  patient: UserType | string | null
  status: boolean
}

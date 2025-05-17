import {AppointmentType} from "./appointment.type";
import {UserType} from "./user.type";
import {MedicalDiagnosisType} from "./medical-diagnosis.type";

export interface MedicalRecordType {
  id?: string;
  dateTime: string
  appointment: AppointmentType | number
  patient: UserType | string | null
  doctor: UserType | string | null
  medical_record: MedicalDiagnosisType | string
  files?: { file: string, file_id: string, filename: string }[]
}

import {MedicineType} from "./medicine.type";
import {LabFileType} from "./lab-file.type";

export interface MedicalDiagnosisType {
  diagnosis: string,
  medicines: MedicineType[],
  tests: string[],
  files: File[] | LabFileType[],
  followup: string
}

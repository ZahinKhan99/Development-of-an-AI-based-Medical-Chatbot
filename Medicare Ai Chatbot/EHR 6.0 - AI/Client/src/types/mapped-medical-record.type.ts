import {MedicalDiagnosisType} from "./medical-diagnosis.type";

export interface MappedMedicalRecordType {
  drId: string,
  date: number,
  tokenId?: number,
  mileStone?: boolean,
  mId: number,
  record: MedicalDiagnosisType
}

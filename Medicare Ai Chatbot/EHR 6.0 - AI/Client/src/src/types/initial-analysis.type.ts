import {UserType} from "./user.type";
import {LabFileType} from "./lab-file.type";

export interface InitialAnalysisType {
  patient: UserType | undefined,
  diagnosis: string,
  fdr: string,
  doctor?: UserType | undefined,
  files?: LabFileType[] | File[]
}

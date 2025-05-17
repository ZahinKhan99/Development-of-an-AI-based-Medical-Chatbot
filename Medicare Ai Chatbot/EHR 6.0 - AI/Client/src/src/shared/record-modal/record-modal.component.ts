import {Component, Input, OnInit} from '@angular/core';
import {LabFileType} from "../../types/lab-file.type";
import {MedicalDiagnosisType} from "../../types/medical-diagnosis.type";
import {formatBytes} from "../utills";
import {environment} from "../../environments/environment.development";

@Component({
  selector: 'app-record-modal',
  templateUrl: './record-modal.component.html',
  styleUrls: ['./record-modal.component.sass']
})
export class RecordModalComponent implements OnInit {

  @Input() diagnosis !: MedicalDiagnosisType
  @Input() showDiagnosis!: boolean;
  files!: { file: string; file_id: string; filename: string }[] | undefined;

  getFiles(files: LabFileType[] | File[] | undefined) {
    return files as LabFileType[]
  }

  ngOnInit() {
    console.log(this.showDiagnosis)
    console.log(this.files)
  }

  setFiles(files: { file: string; file_id: string; filename: string }[] | undefined) {
    // console.log(files)
    if (files)
      this.files = files
  }

  getFileDownloadLink(file: string) {
    return `${environment.SERVER_URL}/${file}`
  }

  protected readonly formatBytes = formatBytes;

}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {formatBytes} from "../utills";
import {MrRecordType} from "../../types/mr-record.type";
import {InitialAnalysisType} from "../../types/initial-analysis.type";
import {LabFileType} from "../../types/lab-file.type";

interface AnalysisType {
  bc_data: MrRecordType,
  ia_data: InitialAnalysisType
}

@Component({
  selector: 'app-analysis-modal',
  templateUrl: './analysis-modal.component.html',
  styleUrls: ['./analysis-modal.component.sass']
})
export class AnalysisModalComponent implements OnInit,OnChanges {

  @Input() analysis !: AnalysisType
  @Input() showAnalysis!: boolean;


  getFiles(files: LabFileType[] | File[] | undefined) {
    return files as LabFileType[]
  }


  getTimeStamp(date: number) {
    return date * 1000
  }

  ngOnInit() {
    console.log(this.showAnalysis)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }


  protected readonly formatBytes = formatBytes;

}

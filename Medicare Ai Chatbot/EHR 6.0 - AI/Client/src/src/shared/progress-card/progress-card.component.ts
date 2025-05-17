import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.sass']
})
export class ProgressCardComponent {
  showSpinner: boolean = true;
  showWarning: boolean = false;
  showSuccess: boolean = false;

  prgMsg: string = 'Loading...'

  @Output() onPrgClose: EventEmitter<number> = new EventEmitter<number>()
  show: boolean = false;


  setProgress(msg: string, mode: number) {
    this.prgMsg = msg;
    this.show = true
    switch (mode) {
      case 0:
        this.showSpinner = true;
        this.showSuccess = false;
        this.showWarning = false;
        break
      case 1:
        this.showSpinner = false;
        this.showSuccess = true;
        this.showWarning = false;
        break
      case 3:
        this.showSpinner = false;
        this.showSuccess = false;
        this.showWarning = true;
    }
  }


  onClose() {
    this.onPrgClose.emit(0)
    this.show = false
  }

}

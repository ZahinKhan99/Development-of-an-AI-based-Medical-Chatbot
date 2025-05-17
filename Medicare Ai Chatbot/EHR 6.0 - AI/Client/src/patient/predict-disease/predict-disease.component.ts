import {Component, OnInit} from '@angular/core';
import {PatientService} from "../services/patient.service";
import {PredictionType} from "../../types/prediction.type";

interface MessageType {
  user: number;
  msg: string;
  isPredicted?: boolean;
  prediction?: PredictionType
}

@Component({
  selector: 'app-predict-disease',
  templateUrl: './predict-disease.component.html',
  styleUrls: ['./predict-disease.component.sass']
})
export class PredictDiseaseComponent implements OnInit {
  optionsLblTxt: string = 'Select options';
  options: string[] = [];
  showPredictBtn: boolean = false;
  messages: MessageType[] = [];
  allSymptoms: string[] = []
  selectedSymptoms: string[] = []
  selectedSymptom: string = '';

  constructor(private ps: PatientService) {

  }

  ngOnInit() {
    this.setDefaultOptions()
    // this.getSymptoms()
  }


  getSymptoms() {
    if (this.allSymptoms.length > 0) {
      this.options = this.allSymptoms
      return
    }
    this.ps.getSymptoms().subscribe({
      next: (r: { symptoms: string[] }) => {
        this.allSymptoms = r.symptoms
        this.options = r.symptoms
      },
      error: err => {
        console.error(err)
      }
    })
  }

  onOptionClicked(option: string) {
    switch (option) {
      case 'Predict Disease':
        this.showPredictBtn = true
        this.optionsLblTxt = "Select Symptoms";
        this.getSymptoms()
        this.messages.push({msg: option, user: 1})
        this.messages.push({msg: 'Please select at-least 3 symptoms from the options below', user: 0})
        break;
      default:
        if (this.showPredictBtn) {
          if (this.selectedSymptoms.includes(option)) {
            this.selectedSymptoms = this.selectedSymptoms.filter(s => s !== option)
          } else
            this.selectedSymptoms.push(option)
        }
        break;
    }
  }

  predictDisease() {
    this.ps.predictDisease(this.selectedSymptoms).subscribe({
      next: (r) => {
        console.log(r)
        this.messages.push({msg: '', user: 0, isPredicted: true, prediction: r.prediction})
        this.showPredictBtn = false
        this.optionsLblTxt = "Select options";
        this.setDefaultOptions()
        this.selectedSymptoms = []
      }
    })
  }

  setDefaultOptions() {
    this.options = ['Predict Disease']
  }

  removeSymptom(symptom: string) {
    this.selectedSymptoms = this.selectedSymptoms.filter(s => s !== symptom)
  }

  onSymptomSelected(ev: Event) {
    this.selectedSymptom = (ev.target as HTMLInputElement).value
    if (this.selectedSymptom.length !== 0 && !this.selectedSymptoms.includes(this.selectedSymptom) && this.allSymptoms.includes(this.selectedSymptom)) {
      this.selectedSymptoms.push(this.selectedSymptom)
      setTimeout(() => {
        this.selectedSymptom = '';
      }, 100);
    }
  }
}

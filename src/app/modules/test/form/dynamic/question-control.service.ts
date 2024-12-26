import { Injectable } from '@angular/core';
import {QuestionBase} from "./question-base";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  constructor() { }

  toFormGroup(questions: QuestionBase<string>[]) {
    const group: any = {};
    questions.forEach(question => {
      group[question.key] = new FormControl(question.value || '', question.required ? Validators.required : []);
    })
    return new FormGroup(group);
  }
}

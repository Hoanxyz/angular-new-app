import {Component, Input, OnInit} from '@angular/core';
import {QuestionBase} from "../question-base";
import {FormGroup} from "@angular/forms";
import {QuestionControlService} from "../question-control.service";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() questions!: QuestionBase<string>[];
  form!: FormGroup;
  payLoad = '';

  constructor(
    private qcs: QuestionControlService,
  ) {
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}

import {Component, OnInit} from '@angular/core';
import {AdItem} from "../banner/ad-item";
import {AdService} from "../banner/ad.service";
import {BehaviorSubject, catchError, debounceTime, map, Observable, of, switchMap} from "rxjs";
import {QuestionBase} from "../form/dynamic/question-base";
import {QuestionService} from "../form/dynamic/question.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DataRowTable} from "../../../shared/components/custom-nz-select/custom-nz-select.component";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  tableColumns: DataRowTable[] = [
    {
      label: 'Id',
      value: 'id',
    },
    {
      label: 'Id 2',
      value: 'id',
    },
    {
      label: 'Tên',
      value: 'name',
    },
  ];

  form: FormGroup;
  constructor(
    private adService: AdService,
    private qService: QuestionService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      select: [{ value: '', disabled: false }, [Validators.required]]
    })
  }

  ngOnInit() {

  }
}

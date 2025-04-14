import {Component, OnInit} from '@angular/core';
import {AdItem} from "../banner/ad-item";
import {AdService} from "../banner/ad.service";
import {BehaviorSubject, catchError, debounceTime, map, Observable, of, switchMap} from "rxjs";
import {QuestionBase} from "../form/dynamic/question-base";
import {QuestionService} from "../form/dynamic/question.service";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  ads!: AdItem[];
  questions$!: Observable<QuestionBase<string>[]> | Observable<any>;
  form: any;

  items = Array.from({ length: 100000 }, (_, i) => ({ value: i, label: `Item ${i + 1}` }));

  selectedValue = 'lucy';
  listOfOption = [
    { label: 'Jack', value: 'jack' },
    { label: 'Lucy', value: 'lucy' },
    { label: 'disabled', value: 'disabled', disabled: true }
  ];
  listOfGroupOption = [
    { label: 'Jack', value: 'jack', groupLabel: 'Manager' },
    { label: 'Lucy', value: 'lucy', groupLabel: 'Manager' },
    { label: 'Tom', value: 'tom', groupLabel: 'Engineer' }
  ];

  constructor(
    private adService: AdService,
    private qService: QuestionService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.questions$ = this.qService.getQuestions();
    this.form = this.fb.group({
      select: [null],
      file: [null]
    })

    // setInterval(() => {
    //   console.log(this.form.get('select').value);
    // }, 2000);
  }

  ngOnInit() {
    this.ads = this.adService.getAds();
    const children: string[] = [];
    for (let i = 10; i < 36; i++) {
      children.push(`${i.toString(36)}${i}`);
    }
    // this.items = children.map((i: any) => {
    //   return {
    //     label: i,
    //     value: i
    //   }
    // });

    // this.items = children;

    /* eslint-disable @typescript-eslint/no-explicit-any */
  }
}

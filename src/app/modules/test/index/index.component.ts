import {Component, OnInit} from '@angular/core';
import {AdItem} from "../banner/ad-item";
import {AdService} from "../banner/ad.service";
import {Observable} from "rxjs";
import {QuestionBase} from "../form/dynamic/question-base";
import {QuestionService} from "../form/dynamic/question.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  ads!: AdItem[];
  questions$!: Observable<QuestionBase<string>[]> | Observable<any>;


  constructor(
    private adService: AdService,
    private qService: QuestionService
  ) {
    this.questions$ = this.qService.getQuestions();
  }

  ngOnInit() {
    this.ads = this.adService.getAds();
  }
}

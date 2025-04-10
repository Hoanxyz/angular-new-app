import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hoandv-app';

  items = Array.from({ length: 100000 }, (_, i) => ({ id: i, name: `Item ${i + 1}` }));

  constructor(public translateService: TranslateService) {

  }

  public changeLanguage(language: string): void {
    this.translateService.use(language);
  }


}

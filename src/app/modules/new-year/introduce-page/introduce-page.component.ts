import {Component} from '@angular/core';
import {users} from "../../../shared/datas/datas";

@Component({
  selector: 'app-introduce-page',
  templateUrl: './introduce-page.component.html',
  styleUrls: ['./introduce-page.component.scss']
})
export class IntroducePageComponent {
  urlMainPage = 'new-year/main';
  users = users;
}

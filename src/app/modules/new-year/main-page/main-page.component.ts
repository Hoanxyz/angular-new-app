import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/services.service";
import {User} from "../../../shared/models/models";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  userCode!: string;
  user!: User;
  userNameToArray!: Array<string>;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['userCode']) {
        this.userCode = params['userCode'];
        this.apiService.getUser(this.userCode).subscribe(
          (data) => {
            if (data) {
              this.user = data;
              this.userNameToArray = this.user.fullName.replace(' ', '-').split('');
              for (let i = 0; i < this.userNameToArray.length; i++) {
                if (this.userNameToArray[i] === '-') {
                  this.userNameToArray[i] = ' ';
                }
              }
            }
          }
        )
      } else {
        this.router.navigate(['new-year/intro']);
      }
    })
  }
}

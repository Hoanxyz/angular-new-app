import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-music',
  templateUrl: './login-music.component.html',
  styleUrls: ['./login-music.component.scss']
})
export class LoginMusicComponent implements OnInit {
  redirectLogin = "music/list-songs";

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }
}

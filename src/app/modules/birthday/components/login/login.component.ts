import { Component } from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {AlertDialogComponent} from "../../../../shared/components/alert-dialog/alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('textChange', [
      state('start',
        style({  })),
      state('end',
        style({  })),
      transition('start => end',
        [animate('0.6s linear', keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 0.5, offset: 0.5 }),
            style({ opacity: 1, offset: 1 }),
          ])
        )]
      ),
      transition('end => start',
        [animate('0.6s linear', keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 0.5, offset: 0.5 }),
            style({ opacity: 1, offset: 1 }),
          ])
        )]
      )
    ])
  ],
})
export class LoginComponent {

  isOpen = true;
  isChangePos = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  changeImages = true;

  constructor(
    public dialog: MatDialog
  ) {
  }

  changePos() {
    this.changeImages = !this.changeImages;
    this.isChangePos = true;
  }

  letGo() {
    if (!this.isChangePos) {
      this.dialog.open(AlertDialogComponent, {
        data: {
          content: 'Xem điều bất ngờ trước đi bạn'
        }
      })
    }
  }
}

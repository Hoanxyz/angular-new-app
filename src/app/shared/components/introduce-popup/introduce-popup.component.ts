import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../alert-dialog/alert-dialog.component";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-introduce-popup',
  templateUrl: './introduce-popup.component.html',
  styleUrls: ['./introduce-popup.component.scss'],
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

export class IntroducePopupComponent {

  @Input() url: string | undefined;
  isChangePos = false;
  changeImages = true;
  hiddenPopup = false;

  constructor(
    public dialog: MatDialog,
    public router: Router
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
    } else {
      console.log('is change');
      this.hiddenPopup = true;
      this.router.navigate([this.url]);
    }
  }
}

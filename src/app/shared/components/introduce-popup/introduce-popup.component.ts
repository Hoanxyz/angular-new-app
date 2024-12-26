import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../alert-dialog/alert-dialog.component";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {NavigationExtras, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Avatar, User} from "../../models/models";

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

  @Input() url!: string;
  @Input() users!: Array<User>;
  @Input() avatars!: Array<Avatar>;
  isChangePos = false;
  changeImages = false;
  hiddenPopup = false;
  formLogin = this.fb.group({
    userCode: [
      '', [Validators.required]
    ]
  })

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private fb: FormBuilder
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
      if (!this.formLogin.valid) {
        this.formLogin.markAllAsTouched();
        return;
      }
      this.hiddenPopup = true;
      const navigationExtra: NavigationExtras = {
        queryParams: {
          userCode: this.formLogin.get('userCode')?.value
        }
      }
      this.router.navigate([this.url], navigationExtra);
    }
  }
}

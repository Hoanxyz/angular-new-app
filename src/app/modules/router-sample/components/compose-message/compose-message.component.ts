import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.scss']
})
export class ComposeMessageComponent {
  details!: string;
  message!: string;
  sending = false;

  constructor(private router: Router) {}

  send(): void {
    this.sending = true;
    this.details = 'Sending message...';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  cancel(): void {
    this.closePopup();
  }

  closePopup(): void {
    this.router.navigate([{outlets: {popup: null}}])
  }
}

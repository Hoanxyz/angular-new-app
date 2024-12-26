import {Component, Input, OnInit} from '@angular/core';
import {LuckyMoney} from "../../../shared/datas/datas";
import {User} from "../../../shared/models/models";

@Component({
  selector: 'app-lucky-money',
  templateUrl: './lucky-money.component.html',
  styleUrls: ['./lucky-money.component.scss']
})
export class LuckyMoneyComponent implements OnInit {
  @Input() user!: User;
  open = false;
  content!: string;

  toggle() {
    this.open = !this.open;
  }

  ngOnInit(): void {
    this.content = LuckyMoney[this.user.code as keyof typeof LuckyMoney];
  }
}

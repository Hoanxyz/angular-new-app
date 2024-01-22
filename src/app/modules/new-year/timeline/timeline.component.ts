import { Component } from '@angular/core';
import {EVENTS} from "../../../shared/datas/datas";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  events = EVENTS;
}

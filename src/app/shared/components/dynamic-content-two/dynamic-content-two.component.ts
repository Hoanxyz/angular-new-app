import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dynamic-content-two',
  templateUrl: './dynamic-content-two.component.html',
  standalone: true,
  styleUrls: ['./dynamic-content-two.component.scss']
})
export class DynamicContentTwoComponent {
  @Input() data!: string;
}

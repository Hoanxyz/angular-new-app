import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dynamic-content-one',
  templateUrl: './dynamic-content-one.component.html',
  standalone: true,
  styleUrls: ['./dynamic-content-one.component.scss']
})
export class DynamicContentOneComponent {
  @Input() data: string | undefined;
}

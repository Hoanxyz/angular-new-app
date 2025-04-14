import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'nz-option-group',
  standalone: true
})
export class OptionGroupDirective {
  constructor(public el: ElementRef<HTMLElement>) {}
}

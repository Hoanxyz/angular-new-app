import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-money',
  templateUrl: './input-money.component.html',
  styleUrls: ['./input-money.component.scss']
})
export class InputMoneyComponent {

  @ViewChild('moneyInput', {static: true}) moneyInput!: ElementRef;
  @Input() control!: FormControl;
  @Input() currency = 'VND';
  @Input() separate = '.';

  changeData(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    let keepNumberOnly = '';
    if (this.currency === 'USD') {
      keepNumberOnly = inputValue.replace(/[^0-9.]/g, '');
      if (keepNumberOnly.includes('.')) {
        keepNumberOnly = this.replaceMultipleDots(keepNumberOnly);
      }
    } else {
      keepNumberOnly = inputValue.replace(/\D/g, '');
    }
    this.moneyInput.nativeElement.value = this.formatMoney(keepNumberOnly);
    this.control.setValue(this.moneyInput.nativeElement.value.replaceAll(this.separate, ''));
  }

  formatMoney(value: string): string {
    if (!value) {
      return value;
    }
    let result = '';
    let integerPart = '';
    let decimalPart = '';
    if (value.includes('.')) {
      integerPart = value.split('.')[0];
      decimalPart = value.split('.')[1];
    } else {
      integerPart = value;
    }

    const integerPartArr: string[] = [];

    let currentIndex = integerPart.length;

    while (currentIndex > 0) {
      const startIndex = Math.max(0, currentIndex - 3);
      const substring = integerPart.substring(startIndex, currentIndex);
      integerPartArr.unshift(substring);
      currentIndex -= 3;
    }
    result = integerPartArr.join(this.separate);
    if (value.includes('.')) {
      result = result + '.' + decimalPart;
    }
    return result
  }

  countDots(str: string): number {
    const dots = str.match(/\./g);
    if (dots === null) {
      return 0;
    }
    return dots.length;
  }

  replaceMultipleDots(str: string): string {
    return str.replace(/\.{2,}/g, (match, offset) => {
      return offset === 0 ? match : '';
    });
  }


  onBlur() {
    this.control.markAsTouched();
  }
}

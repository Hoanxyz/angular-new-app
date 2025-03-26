import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-lpb-money-input-new',
  templateUrl: './lpb-money-input-new.component.html',
  styleUrls: ['./lpb-money-input-new.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => LpbMoneyInputNewComponent)
    }
  ]
})
export class LpbMoneyInputNewComponent implements OnInit, ControlValueAccessor, OnDestroy, OnChanges {
  @ViewChild('moneyInput', {static: true}) moneyInput!: ElementRef;
  @Input() currency = 'VND';
  @Input() placeholder = '';
  @Input() canNegative = false;
  @Input() maxLength = 99999;
  @Output() blurInput = new EventEmitter<any>();
  separate = '.';
  onChangeSubs: Subscription[] = [];
  isDisabled = false;
  touched = false;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currency']) {
      if (this.currency === 'VND') {
        this.separate = '.';
      } else {
        this.separate = ',';
      }

      if (!this.isDisabled) {
        this.changeData(this.moneyInput.nativeElement.value.replaceAll('.', '').replaceAll(',', ''));
      }
    }
  }

  onChange = (value: string) => {};

  onTouched = () => {};

  writeValue(value: string): void {
    this.changeData(value);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  changeData(event: Event | string): void {
    let value;
    if (typeof event === 'string') {
      value = event;
    } else {
      const inputElement = event.target as HTMLInputElement;
      value = inputElement.value;
    }
    if (!value) {
      this.moneyInput.nativeElement.value = '';
      this.onChange('');
      return;
    }
    const inputValue = value.toString();
    let validString = '';
    if (this.currency === 'VND') {
      const condition = this.canNegative ? /[^0-9-]/g : /[^0-9]/g;
      validString = inputValue.replace(condition, '');
    } else {
      const condition = this.canNegative ? /[^0-9.-]/g : /[^0-9.]/g;
      validString = inputValue.replace(condition, '');
      if (validString.includes('.')) {
        validString = this.replaceMultipleDots(validString);
      }
    }
    validString = this.normalizeNegativeSign(validString);
    this.moneyInput.nativeElement.value = this.formatMoney(validString);
    this.onChange(this.moneyInput.nativeElement.value.replaceAll(this.separate, ''));
  }

  formatMoney(value: string): string {
    if (!value) {
      return value;
    }
    const isNegative = value.includes('-');
    if (isNegative) {
      value = value.replace('-', '');
    }
    let result = '';
    let integerPart = '';
    let decimalPart = '';
    if (value.includes('.') && this.currency !== 'VND') {
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
    if (value.includes('.') && this.currency !== 'VND') {
      result = result + '.' + decimalPart;
    }
    if (isNegative) {
      result = '-' + result;
    }
    return result;
  }

  replaceMultipleDots(str: string): string {
    return str.replace(/\.{2,}/g, (match, offset) => {
      return offset === 0 ? match : '';
    });
  }

  normalizeNegativeSign(input: string): string {
    let normalizedString = input.replace(/-/g, '');
    if (input.startsWith('-')) {
      normalizedString = '-' + normalizedString;
    }
    return normalizedString;
  }

  handleBlur(): void {
    this.blurInput.emit(this.moneyInput.nativeElement.value);
  }

  ngOnDestroy(): void {
    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }
}

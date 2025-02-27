// import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
// import {MatDatepicker} from '@angular/material/datepicker';
// // @ts-ignore
// import * as moment from 'moment/moment';
// import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
// // @ts-ignore
// import {Moment} from 'moment';
//
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'DD/MM/YYYY',
//   },
//   display: {
//     dateInput: 'DD/MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };
// @Component({
//   selector: 'app-lpb-datepicker-new',
//   templateUrl: './lpb-datepicker-new.component.html',
//   styleUrls: ['./lpb-datepicker-new.component.scss'],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       multi: true,
//       useExisting: LpbDatepickerNewComponent
//     },
//     // {
//     //   provide: NG_VALIDATORS,
//     //   multi: true,
//     //   useExisting: LpbDatepickerNewComponent
//     // }
//   ]
// })
// export class LpbDatepickerNewComponent implements OnInit, ControlValueAccessor  {
//
//   @ViewChild('matDatePicker', {static: true}) matDatePicker!: MatDatepicker<Date>;
//   @ViewChild('txtMainInput', {static: true}) txtMainInput!: ElementRef;
//   @ViewChild('txtHiddenInput', {static: true}) txtHiddenInput!: ElementRef;
//   @Input() placeholder = 'DD/MM/YYYY';
//   @Input() startView: 'month' | 'year' | 'multi-year' = 'month';
//   isValid = false;
//   errorMsg = '';
//   minYear = 1000;
//   maxYear = 3000;
//   isClick = false;
//   isDisable = false;
//   touched = false;
//   disabled = false;
//   @Input() minDate: any = null;
//   @Input() maxDate: any = null;
//   @Input() readonly = false;
//   @Input() className = '';
//   @Output() dateChanged = new EventEmitter<any>();
//   @Output() blurInput = new EventEmitter<any>();
//
//   onChange = (value: any) => {};
//
//   onTouched = () => {};
//   constructor() {
//   }
//
//   writeValue(obj: any): void {
//     this.setValue(obj);
//
//   }
//
//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }
//
//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }
//
//   markAsTouched(): void {
//     if (!this.touched) {
//       this.onTouched();
//       this.touched = true;
//     }
//   }
//
//
//   setDisabledState?(isDisabled: boolean): void {
//     this.disabled = isDisabled;
//   }
//
//   ngOnInit(): void {
//   }
//
//   /** Báº­t calendar khi click vĂ o icon
//    *
//    */
//   openDatePicker(): void {
//     if (this.isValid) {
//     } else {
//       // @ts-ignore
//       this.matDatePicker.select(null);
//     }
//
//     this.matDatePicker.open();
//   }
//
//   txtMainInputKeydown(event: any): void {
//     // tslint:disable-next-line:prefer-const
//     let input = this.txtMainInput.nativeElement;
//     // tslint:disable-next-line:prefer-const
//     let key = event.keyCode || event.which;
//     if (key <= 46) { // kĂ­ tá»± Ä‘iá»u khiá»ƒn
//     } else if (key === 191) { // slash
//       // tslint:disable-next-line:prefer-const
//       let oldValue = input.value;
//       if (!oldValue) { // náº¿u chÆ°a cĂ³ gĂ¬ thĂ¬ khĂ´ng cho nháº­p slash
//         event.preventDefault();
//       } else if (oldValue.endsWith('/') && this.isCursorEnd(input)) { // khĂ´ng cho nháº­p 2 kĂ­ tá»± slash liĂªn tiáº¿p
//         event.preventDefault();
//       } else if (oldValue.split('/').length >= 3) { // náº¿u cĂ³ 2 kĂ­ tá»± slash rá»“i thĂ¬ khĂ´ng cho nháº­p slash ná»¯a
//         event.preventDefault();
//       }
//     } else if (key < 48 || (key > 57 && key < 96) || key > 105) { // not a number
//       event.preventDefault();
//     } else { // number
//     }
//   }
//
//   txtMainInputKeyup(event: any): void {
//     // tslint:disable-next-line:prefer-const
//     let input = this.txtMainInput.nativeElement;
//     // tslint:disable-next-line:prefer-const
//     let key = event.keyCode || event.which;
//     if (key <= 46) { // kĂ­ tá»± Ä‘iá»u khiá»ƒn
//     } else if (key === 191) { // slash
//     } else if (key < 48 || (key > 57 && key < 96) || key > 105) { // not a number
//     } else { // is a number
//       // tslint:disable-next-line:prefer-const
//       let value = input.value;
//       // tslint:disable-next-line:prefer-const
//       let parts = value.split('/');
//       // tslint:disable-next-line:prefer-const
//       let slashCount = parts.length - 1;
//       if (slashCount === 0) { // Ä‘ang nháº­p ngĂ y
//         // tslint:disable-next-line:prefer-const
//         let day = parts[0];
//         if (day.length === 2) {
//           input.value += '/';
//         } else if (day.length === 1 && Number(day) > 3) {
//           input.value += '/';
//         }
//       } else if (slashCount === 1 && this.isCursorEnd(input)) { // Ä‘ang nháº­p thĂ¡ng
//         // tslint:disable-next-line:prefer-const
//         let month = parts[1];
//         if (month.length === 2) {
//           input.value += '/';
//         } else if (month.length === 1 && Number(month) > 1) {
//           input.value += '/';
//         }
//       } else if (slashCount === 2 && parts[2].length > 4) { // Ä‘á»™ dĂ i nÄƒm lá»›n hÆ¡n 4 thĂ¬ cáº¯t Ä‘i
//         input.value = parts[0] + '/' + parts[1] + '/' + parts[2].substring(0, 4);
//       }
//     }
//   }
//
//   txtMainInputChange(): void {
//     this.checkValid();
//     // tslint:disable-next-line:prefer-const
//     let value = this.txtMainInput.nativeElement.value;
//     if (this.isValid && value.length < 10) {
//       // tslint:disable-next-line:prefer-const
//       let parts = value.split('/');
//       this.txtMainInput.nativeElement.value = parts[0].padStart(2, '0') + '/' + parts[1].padStart(2, '0') + '/' + parts[2].padStart(4, '0');
//     }
//     // this.dateChanged.emit();
//     this.onChange(this.getValue());
//   }
//
//   /** GĂ¡n giĂ¡ trá»‹ máº·c Ä‘á»‹nh cho Ă´ input lá»‹ch
//    *
//    * @param d : GiĂ¡ trá»‹ ngĂ y truyá»n vĂ o
//    */
//   setSelectedDate(d: any): void {
//     if (d) {
//       this.txtMainInput.nativeElement.value = moment(d).format('DD/MM/YYYY');
//       this.isValid = true;
//     } else {
//       this.txtMainInput.nativeElement.value = '';
//       this.isValid = false;
//     }
//   }
//
//   getSelectedDate(): any {
//     if (!this.isValid) {
//       return null;
//     } else {
//       return moment(this.txtMainInput.nativeElement.value, 'DD/MM/YYYY').toDate();
//     }
//   }
//
//   getValue(): any {
//     return this.txtMainInput.nativeElement.value;
//   }
//
//   setValue(value: any): void {
//     this.txtMainInput.nativeElement.value = value;
//     this.txtMainInputChange();
//   }
//
//   focus(): void {
//     this.txtMainInput.nativeElement.focus();
//   }
//
//   private isCursorEnd(input: any): any {
//     // tslint:disable-next-line:prefer-const
//     let length = input && input.value ? input.value.length : 0;
//     // tslint:disable-next-line:prefer-const
//     let selectionStart = input ? input.selectionStart : 0;
//     return selectionStart === length;
//   }
//
//   private checkValid(): void {
//     // tslint:disable-next-line:prefer-const
//     let value = this.txtMainInput.nativeElement.value;
//     if (!value) {
//       this.isValid = false;
//       return;
//     }
//     // tslint:disable-next-line:prefer-const
//     let parts = value.split('/');
//     if (parts.length !== 3) {
//       this.isValid = false;
//       return;
//     }
//     // tslint:disable-next-line:prefer-const
//     let day = parts[0];
//     // tslint:disable-next-line:prefer-const
//     let month = parts[1];
//     // tslint:disable-next-line:prefer-const
//     let year = parts[2];
//     if (!day || !month || !year || year.length < 4 || Number(year) < this.minYear || Number(year) > this.maxYear) {
//       this.isValid = false;
//       return;
//     }
//     // tslint:disable-next-line:prefer-const
//     let m = moment(value, 'DD/MM/YYYY');
//     if (!m || !m.isValid()) {
//       this.isValid = false;
//       return;
//     }
//
//     if (this.minDate && m.isBefore(this.minDate, 'day')) {
//       this.isValid = false;
//       return;
//     }
//
//     if (this.maxDate && m.isAfter(this.maxDate, 'day')) {
//       this.isValid = false;
//       return;
//     }
//
//     this.isValid = true;
//   }
//
//   // tslint:disable-next-line:typedef
//   datePickerChange(evt: any) {
//     const selectedDate = evt.value;
//     if (selectedDate && this.txtMainInput.nativeElement.value !== this.txtHiddenInput.nativeElement.value) {
//       this.txtMainInput.nativeElement.value = moment(selectedDate).format('DD/MM/YYYY');
//       this.checkValid();
//       //
//       // this.dateChanged.emit();
//       this.onChange(this.getValue());
//     }
//   }
//
//   haveValue(): any {
//     return !!this.txtMainInput.nativeElement.value;
//   }
//
//   haveValidDate(): any {
//     return this.isValid;
//   }
//
//   isOpen(): any {
//     return this.matDatePicker && this.matDatePicker.opened;
//   }
//
//   setErrorMsg(msg: any): any {
//     this.errorMsg = msg;
//   }
//
//   blurMainInput(): void {
//     this.blurInput.emit(this.txtMainInput.nativeElement.value);
//   }
//
//   disable(): void {
//     this.isDisable = true;
//   }
//
//   enable(): void {
//     this.isDisable = false;
//   }
//
//   @HostListener('click', ['$event'])
//   // tslint:disable-next-line:typedef
//   onClickInput(event: MouseEvent) {
//     this.isClick = true;
//   }
//
//   clearDate(): void {
//     this.txtMainInput.nativeElement.value = '';
//   }
//
//   setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<any>): void {
//     if (this.startView === 'multi-year') {
//       const ctrlValue = (normalizedMonthAndYear.month() + 1) + '/' + normalizedMonthAndYear.year();
//       this.setValue(ctrlValue);
//       datepicker.close();
//     }
//
//   }
//   // validate(control: AbstractControl): ValidationErrors | null {
//   //   const quantity = control.value;
//   //   if (control.value) {
//   //     return {
//   //       mustBePositive: {
//   //         quantity
//   //       }
//   //     };
//   //   }
//   // }
//
// }

// import {
//   Component,
//   ContentChild,
//   EventEmitter, forwardRef,
//   Input,
//   OnChanges,
//   OnDestroy,
//   OnInit,
//   Output, SimpleChanges, TemplateRef,
//   ViewChild
// } from '@angular/core';
// import {
//   ControlValueAccessor,
//   FormControl,
//   NG_VALIDATORS,
//   NG_VALUE_ACCESSOR, ReactiveFormsModule,
//   ValidationErrors,
//   Validator
// } from '@angular/forms';
// import {Observable, of, Subject, Subscription} from 'rxjs';
// import {
//   NgHeaderTemplateDirective,
//   NgLabelTemplateDirective,
//   NgOptionTemplateDirective,
//   NgSelectComponent
// } from '@ng-select/ng-select';
// import {HttpClient} from '@angular/common/http';
// import {debounceTime, distinctUntilChanged, finalize, map, switchMap} from 'rxjs/operators';
// import {listApis} from "../../services/global-variables.constant";
// import {NgClass, NgTemplateOutlet} from "@angular/common";
//
// export class LpbSelect2Config {
//   isNewApi?: boolean;
//   clearable?: boolean;
//   sort?: boolean;
//   closeOnSelect? = true;
//   paging ? = true;
//   displayCodeAndName ? = false;
// }
//
// export enum FilterOperator {
//   EQUAL = 'eq',
//   EQUAL_IGNORE_CASE = 'eqi',
//   LIKE = 'like',
//   GREATER_THAN_EQUAL = 'gte',
//   LESSER_THAN_EQUAL = 'lte',
//   IN = 'in', NOT_IN = 'nin',
//   NOT_EQUAL = 'neq'
// }
//
// @Component({
//   selector: 'app-new-select-comp',
//   standalone: true,
//   templateUrl: './new-select-comp.component.html',
//   styleUrls: ['./new-select-comp.component.scss'],
//   imports: [
//     NgTemplateOutlet,
//     NgClass,
//     NgSelectComponent,
//     ReactiveFormsModule,
//     NgOptionTemplateDirective,
//     NgLabelTemplateDirective,
//     NgHeaderTemplateDirective
//   ],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => NewSelectCompComponent),
//       multi: true
//     },
//     {
//       provide: NG_VALIDATORS,
//       useExisting: forwardRef(() => NewSelectCompComponent),
//       multi: true
//     }
//   ]
// })
// export class NewSelectCompComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy, OnChanges {
//   listOptions = [];
//   listOptionsBuffer = [];
//   bufferSize = 50;
//   input$ = new Subject<string>();
//   total = 0;
//   page = 0;
//   searchTerm = '';
//   currentValue = '';
//   public value = new FormControl();
//
//   onChangeSubs: Subscription[] = [];
//   private destroy$ = new Subject<void>();
//   isLoading = false;
//   isChanged = false;
//   isOpen = false;
//   @Input() apiUrl = '';
//   @Input() labelName: string = '';
//   @Input() items = [];
//   @Input() bindValue: string = 'label';
//   @Input() bindTitle: string = 'value';
//   @Input() className?: string;
//   @Input() config: LpbSelect2Config = {
//     isNewApi: true,
//     sort: false,
//     closeOnSelect: true,
//     paging: true,
//     displayCodeAndName: false
//   };
//
//   @Input() placeholder = '';
//   @Input() optionAdditional: any;
//   @Input() multiple = false;
//   @Input() appendTo = '';
//
//   @Output() clear: EventEmitter<any> = new EventEmitter<any>();
//   @Output() change: EventEmitter<any> = new EventEmitter<any>();
//   @ViewChild('ngSelect') ngSelect?: NgSelectComponent;
//   /**
//    * example (handleData)="({data, setData }) => { const newData = data.filter(...); setData(newData); }"
//    */
//   @Output() handleData: EventEmitter<{
//     data: any; // data output
//     setData: (data: any) => void; // set new data
//   }> = new EventEmitter<{ data: any; setData: (data: any) => void }>();
//
//   @ContentChild(TemplateRef) templateRef?: TemplateRef<any>;
//
//   constructor(private http: HttpClient, private httpClient: HttpClient) {
//   }
//
//   ngOnInit(): void {
//     // this.listOptions = this.items;
//     // if(this.apiUrl) {
//     this.input$.pipe(
//       // filter((term) => term.length >= 3),
//       debounceTime(300),
//       distinctUntilChanged(),
//       switchMap(term => {
//         return this.fakeService(term);
//       }),
//       // takeUntil(this.destroy$)
//     )
//       .subscribe(res => {
//         if (!this.apiUrl) {
//           // console.log(res);
//           // console.log(this.listOptions);
//           this.listOptionsBuffer = res;
//           this.isLoading = false;
//         } else {
//           if (!this.handleData.observers?.length) {
//             if (this.config.displayCodeAndName) {
//               this.listOptionsBuffer = this.displayCodeAndNameHandle(res.content);
//             } else {
//               this.listOptionsBuffer = res.content;
//             }
//
//             this.total = res.meta?.total;
//             if (this.config.sort) {
//               this.listOptions.sort((obj1, obj2) => {
//                 if (obj1[this.labelName] > obj2[this.labelName]) {
//                   return 1;
//                 }
//
//                 if (obj1[this.labelName] < obj2[this.labelName]) {
//                   return -1;
//                 }
//
//                 return 0;
//               });
//             }
//             this.isLoading = false;
//           }
//         }
//
//       });
//     // }
//
//   }
//
//   onOpen(isOpen: any): void {
//     this.isOpen = isOpen;
//     if (!this.listOptionsBuffer || this.listOptionsBuffer.length === 0 || this.currentValue) {
//       this.fetchData(this.page, true);
//     }
//
//   }
//
//   fetchMore(term: any): void {
//     this.searchTerm = term;
//     const len = this.listOptionsBuffer.length;
//     if (len < this.total) {
//
//       if (!this.apiUrl) {
//         let more = [];
//         if (term) {
//           // @ts-ignore
//           more = this.items.filter(opt => opt[this.labelName].includes(term)).slice(len, this.bufferSize + len);
//         } else {
//           more = this.items.slice(len, this.bufferSize + len);
//         }
//
//         if (this.config.displayCodeAndName) {
//           more = this.displayCodeAndNameHandle(more);
//         }
//
//         this.isLoading = true;
//         setTimeout(() => {
//           this.isLoading = false;
//           this.listOptionsBuffer = this.listOptionsBuffer.concat(more);
//         }, 200);
//       } else {
//         this.fetchData(++this.page);
//       }
//
//     }
//
//   }
//
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['apiUrl'] && !changes['apiUrl'].firstChange) {
//       this.listOptionsBuffer = [];
//       this.fetchData(this.page);
//       this.isChanged = true;
//     } else if (this.items && !this.apiUrl) {
//       this.fetchData(this.page);
//       this.isChanged = true;
//     }
//   }
//
//   ngOnDestroy(): void {
//     for (const sub of this.onChangeSubs) {
//       sub.unsubscribe();
//     }
//     // Unsubscribe from observables
//     this.destroy$.next();
//     this.destroy$.complete();
//   }
//
//   onChange($event: any): void {
//     this.change.emit($event);
//   }
//
//   handleClearClick(): void {
//     // @ts-ignore
//     this.ngSelect.handleClearClick();
//   }
//
//   onTouched = () => {
//   }
//
//   // private provinceData: { id: number, name: string, type: 'central' | 'province' };
//   // onChange: (provinceData: any) => void;
//   // onTouched: () => void;
//   // isDisabled: boolean;
//   // @Input('type') type: 'central' | 'province';
//
//
//   registerOnChange(onChange: any): any {
//     const sub = this.value.valueChanges.subscribe(onChange);
//     this.onChangeSubs.push(sub);
//   }
//
//   registerOnTouched(onTouched: any): any {
//     this.onTouched = onTouched;
//   }
//
//   setDisabledState(disabled: any): any {
//     if (disabled) {
//       this.value.disable();
//     } else {
//       this.value.enable();
//     }
//   }
//
//   writeValue(value: any): any {
//     if (value) {
//       this.currentValue = value;
//       this.onOpen(false);
//       if (this.config.paging) {
//         setTimeout(() => {
//           this.listOptionsBuffer = this.listOptions;
//           this.value.setValue(value);
//         }, 300);
//       } else {
//         this.listOptionsBuffer = this.listOptions;
//         this.value.setValue(value);
//       }
//     } else {
//       this.ngSelect?.handleClearClick();
//     }
//   }
//
//   // @ts-ignore
//   validate(c: FormControl): ValidationErrors | null {
//     const value = c.value;
//     if (!value && c.hasError('required')) {
//       return {
//         required: true
//       };
//     }
//     // if (!this.value.validator && c.validator) {
//     //   this.value.setValidators(c.validator);
//     // }
//     //
//     // if (this.value.valid) {
//     //   return null;
//     // }
//
//     // const errors : any = {};
//
//     // return this.value.errors;
//   }
//
//
//   fetchData(pageIndex: any, openAction = false): any {
//     this.listOptions = [];
//     if (this.items === null || this.items === undefined) {
//       this.items = [];
//     }
//     const headers = {
//       'x-skip-spinner': 'true',
//     };
//     if (this.apiUrl) {
//       this.isLoading = true;
//       if (this.config.isNewApi) {
//         let filter = this.searchTerm ? `${this.labelName}|${FilterOperator.LIKE}|${this.searchTerm}` : '';
//         if (this.currentValue && !this.isOpen) {
//           filter = `${this.bindValue}|${FilterOperator.EQUAL}|${this.currentValue}`;
//         }
//         const params = {
//           page: pageIndex,
//           size: '10',
//           textSearch: ''
//         };
//         this.http.get<any>(`${(listApis.local) + this.apiUrl}`, {headers: {'x-skip-spinner': 'true'}, params})
//           .pipe(
//             finalize(() => {
//               // this is called on both success and error
//               this.isLoading = false;
//             })
//           )
//           .subscribe((res) => {
//             if (!this.handleData.observers?.length) {
//               if (this.config.displayCodeAndName) {
//                 this.listOptions = this.displayCodeAndNameHandle(res.content);
//               } else {
//                 this.listOptions = res.content;
//               }
//
//
//               this.total = res.totalElements ?? res.content.length;
//               if (this.config.sort) {
//                 this.listOptions.sort((obj1, obj2) => {
//                   if (obj1[this.labelName] > obj2[this.labelName]) {
//                     return 1;
//                   }
//
//                   if (obj1[this.labelName] < obj2[this.labelName]) {
//                     return -1;
//                   }
//
//                   return 0;
//                 });
//               }
//
//               if (this.optionAdditional) {
//                 this.total = this.total + this.optionAdditional.length;
//                 this.listOptions = this.optionAdditional
//                   .concat(this.listOptions);
//               }
//             } else {
//               this.handleData.emit({
//                 data: this.optionAdditional ? this.optionAdditional
//                   .concat(res.content) : res.content,
//                 setData: (data: any) => {
//                   this.listOptions = data;
//                 },
//               });
//             }
//             this.listOptionsBuffer = this.listOptionsBuffer.concat(this.listOptions);
//             this.listOptionsBuffer = this.listOptionsBuffer.filter(
//               (person, index, self) =>
//                 index === self.findIndex((p) => p[this.bindValue] === person[this.bindValue])
//             );
//             // this.listOptionsBuffer = this.listOptions.slice(0, this.bufferSize);
//           }, error => {
//             this.isLoading = false;
//             this.listOptions = [];
//           });
//       } else {
//         this.httpClient.get<any>(`${listApis.local + this.apiUrl}`, {headers})
//           .pipe(
//             finalize(() => {
//               // this is called on both success and error
//               this.isLoading = false;
//             })
//           )
//           .pipe(map(res => {
//             if (!this.handleData.observers?.length) {
//               this.listOptions = res.items;
//               if (this.config.sort) {
//                 this.listOptions.sort((obj1, obj2) => {
//                   if (obj1[this.labelName] > obj2[this.labelName]) {
//                     return 1;
//                   }
//
//                   if (obj1[this.labelName] < obj2[this.labelName]) {
//                     return -1;
//                   }
//
//                   return 0;
//                 });
//               }
//
//               if (this.optionAdditional) {
//                 this.listOptions = this.optionAdditional
//                   .concat(this.listOptions);
//               }
//             } else {
//               this.handleData.emit({
//                 data: this.optionAdditional ? this.optionAdditional
//                   .concat(res.items) : res.items,
//                 setData: (data) => {
//                   this.listOptions = data;
//                 },
//               });
//             }
//             this.listOptionsBuffer = this.listOptions.slice(0, this.bufferSize);
//             return res;
//           })).subscribe(rs => {
//
//         }, error => {
//           this.listOptions = [];
//         });
//       }
//     } else {
//       this.total = this.items.length;
//       this.listOptions = this.items;
//       // this.listOptions.sort((obj1, obj2) => {
//       //   if (obj1[this.labelName] > obj2[this.labelName]) {
//       //     return 1;
//       //   }
//
//       //   if (obj1[this.labelName] < obj2[this.labelName]) {
//       //     return -1;
//       //   }
//
//       //   return 0;
//       // });
//
//       if (this.optionAdditional) {
//         this.total = this.total + this.optionAdditional?.length;
//         this.listOptions = this.optionAdditional
//           .concat(this.listOptions.filter(e => e[this.labelName] !== this.optionAdditional.includes((o: any) => o[this.labelName])));
//       }
//
//       this.listOptionsBuffer = this.listOptions.slice(0, this.bufferSize);
//       if (this.config.displayCodeAndName) {
//         this.listOptionsBuffer = this.displayCodeAndNameHandle(this.listOptionsBuffer);
//       }
//     }
//
//   }
//
//   onClear(): void {
//     this.clear.emit();
//   }
//
//   shouldEnableVirtualScroll(): boolean {
//
//     if (!this.listOptions) {
//       return false;
//     }
//
//     return this.listOptions?.length > this.bufferSize;
//   }
//
//   onSearch(term?: any): void {
//     this.searchTerm = term.term;
//     this.input$.next(term.term);
//
//   }
//
//   private fakeService(term: any): Observable<any> {
//
//     if (term) {
//
//       this.searchTerm = term;
//       if (this.apiUrl && !this.isLoading) {
//         this.isLoading = true;
//         let params;
//         if (this.config.displayCodeAndName) {
//           params = {
//             page: '0',
//             size: '10',
//             filter: this.searchTerm ? `` : '',
//             orFilter: this.searchTerm ? `${this.bindValue}|${FilterOperator.LIKE}|${this.searchTerm}&${this.labelName}|${FilterOperator.LIKE}|${this.searchTerm}` : ''
//           };
//         } else {
//           params = {
//             page: '0',
//             size: '10',
//             filter: this.searchTerm ? `${this.labelName}|${FilterOperator.LIKE}|${this.searchTerm}` : ''
//           };
//         }
//
//         return this.http.get<any>(`${(listApis.local) + this.apiUrl}`, {headers: {'x-skip-spinner': 'true'}, params});
//
//       } else {
//         this.isLoading = false;
//         return of(this.listOptions)
//           .pipe(map(data => data.filter((x: any) => x[this.labelName]?.toLowerCase().includes(term?.toLowerCase()))));
//       }
//
//     } else {
//       this.searchTerm = '';
//       this.isLoading = false;
//       if (this.apiUrl) {
//         this.listOptionsBuffer = [];
//         // this.fetchData(0);
//         let params;
//         if (this.config.displayCodeAndName) {
//           params = {
//             page: '0',
//             size: '10',
//             filter: this.searchTerm ? `` : '',
//             orFilter: this.searchTerm ? `${this.bindValue}|${FilterOperator.LIKE}|${this.searchTerm}&${this.labelName}|${FilterOperator.LIKE}|${this.searchTerm}` : ''
//           };
//         } else {
//           params = {
//             page: '0',
//             size: '10',
//             filter: this.searchTerm ? `${this.labelName}|${FilterOperator.LIKE}|${this.searchTerm}` : ''
//           };
//         }
//         return this.http.get<any>(`${(listApis.local) + this.apiUrl}`, {headers: {'x-skip-spinner': 'true'}, params});
//       } else {
//         this.isLoading = false;
//         return of(this.listOptions)
//           .pipe(map(data => data));
//       }
//
//     }
//
//   }
//
//   displayCodeAndNameHandle(items: any): any {
//     return items?.map((item: any) => {
//       if (!item.displayCodeAndName) {
//         item[this.labelName] = item[this.bindValue] + ' - ' + item[this.labelName];
//         item[`displayCodeAndName`] = true;
//       }
//       return {
//         ...item
//       };
//     });
//   }
// }

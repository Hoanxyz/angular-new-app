import {
  AfterContentChecked,
  AfterContentInit, AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output, QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  NzFilterOptionType, NzOptionComponent, NzOptionGroupComponent,
  NzSelectComponent,
  NzSelectItemInterface,
  NzSelectModeType,
  NzSelectModule, NzSelectOptionInterface, NzSelectPlacementType
} from "ng-zorro-antd/select";
import {ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgTemplateOutlet, SlicePipe} from "@angular/common";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {NzSelectSizeType} from "ng-zorro-antd/select/select.component";
import {Subscription} from "rxjs";
import {BooleanInput} from "@angular/cdk/coercion";
import {InputBoolean} from "ng-zorro-antd/core/util";
import {WithConfig} from "ng-zorro-antd/core/config";
import {HttpClient} from "@angular/common/http";
import {NzIconModule} from "ng-zorro-antd/icon";

const defaultFilterOption: NzFilterOptionType = (searchValue: string, item: NzSelectItemInterface): boolean => {
  if (item && item.nzLabel) {
    return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  } else {
    return false;
  }
};

export interface ApiUrlConfig {
  label: string;
  value: string;
  paginate?: boolean;
  method?: 'POST' | 'GET';
  body?: any;
  options?: object;
  showCount?: boolean;
  searchText?: string;
}

@Component({
  selector: 'app-custom-nz-select',
  standalone: true,
  imports: [
    NzSelectModule,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    SlicePipe,
    NgTemplateOutlet,
    NzIconModule
  ],
  templateUrl: './custom-nz-select.component.html',
  styleUrl: './custom-nz-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: CustomNzSelectComponent
    }
  ]
})

export class CustomNzSelectComponent implements ControlValueAccessor, OnInit, AfterContentInit, OnChanges, OnDestroy, AfterContentChecked, AfterViewInit {
  static ngAcceptInputType_nzAllowClear: BooleanInput;
  static ngAcceptInputType_nzBorderless: BooleanInput;
  static ngAcceptInputType_nzShowSearch: BooleanInput;
  static ngAcceptInputType_nzLoading: BooleanInput;
  static ngAcceptInputType_nzAutoFocus: BooleanInput;
  static ngAcceptInputType_nzAutoClearSearchValue: BooleanInput;
  static ngAcceptInputType_nzServerSearch: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzOpen: BooleanInput;

  @ContentChildren(NzOptionGroupComponent) projectedGroups!: QueryList<NzOptionGroupComponent>;
  @ContentChildren(NzOptionComponent, { descendants: true }) projectedOptionsInGroups!: QueryList<NzOptionComponent>;
  optionGroups: Array<{ nzLabel: string | number | TemplateRef<any> | null; options: NzOptionComponent[]; }> = [];

  @ContentChildren(NzOptionComponent) projectedOptions!: QueryList<NzOptionComponent>;
  flatOptions: NzOptionComponent[] = [];

  @ViewChild('nzSelect') nzSelect!: NzSelectComponent;
  value = new FormControl();

  @Input() items: any;
  @Input() isOptionGroup = false;
  @Input() compareWith: (o1: NzSafeAny, o2: NzSafeAny) => boolean = (o1: NzSafeAny, o2: NzSafeAny) => o1 === o2;
  @Input() nzLabel = '';
  @Input() nzValue = '';
  @Input() nzDisabled = false;
  @Input() nzLoading = false;
  @Input() nzAllowClear = false;
  @Input() nzShowArrow = false;
  @Input() hideSelected = false;
  @Input() nzMaxTagCount = Infinity;
  @Input() nzPlaceHolder: string | TemplateRef<NzSafeAny> | null = null;
  @Input() nzMode: NzSelectModeType = 'default';
  @Input() nzSize: NzSelectSizeType = 'default';
  @Input() nzServerSearch: boolean = false;
  @Input() nzShowSearch: boolean = false;
  @Input() nzFilterOption: NzFilterOptionType = defaultFilterOption;
  @Input() nzMaxTagPlaceholder: TemplateRef<{
    $implicit: NzSafeAny[];
  }> | null = null;
  @Input() nzDropdownRender: TemplateRef<NzSafeAny> | null = null;
  @Input() nzTokenSeparators: string[] = [];
  @Input() @WithConfig<boolean>() @InputBoolean() nzBorderless = false;
  @Input() nzOptions: NzSelectOptionInterface[] = [];
  @Input() nzCustomTemplate: TemplateRef<{ $implicit: NzSelectItemInterface }> | null = null;
  @Input() nzPlacement: NzSelectPlacementType | null = null;
  @Input() @InputBoolean() nzAutoFocus = false;
  @Input() @InputBoolean() nzAutoClearSearchValue = true;
  @Input() @InputBoolean() nzOpen = false;

  @Output() nzOnSearch = new EventEmitter<string>();
  @Output() nzOnBlur = new EventEmitter<void>();
  @Output() nzOnFocus = new EventEmitter<void>();
  @Output() nzOnClear = new EventEmitter<void>();
  @Output() nzScrollToBottom = new EventEmitter<void>();

  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Input() apiUrl?: string;
  @Input() apiConfig: ApiUrlConfig = {
    label: 'label',
    value: 'value',
    paginate: false,
    method: 'GET',
    body: {},
    options: {},
    showCount: true,
    searchText: '',
  };
  listOptions: any[] = [];
  currentPage = 0;
  size = 15;
  isAll = false;
  apiCalling = false;
  total = 0;
  searchText = '';
  firstOpen = true;

  constructor(
    private http: HttpClient
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.handleCallApi();
    });
  }

  handleDataApi(value: any[], total: number): any {
    this.total = total
    this.listOptions = this.listOptions.concat(value);
    if (total == this.listOptions.length) {
      this.isAll = true;
    }
    console.log('listOptions: ', this.listOptions);
  }

  ngAfterContentChecked(): void {

    // Render options again when options changed
    this.projectedOptions.changes.subscribe(() => {
      this.renderOptions();
    });
  }

  onChangeSubs: Subscription[] = [];
  onTouched = () => {};

  onChange = (value: any) => {};


  ngOnInit(): void {
    this.value.valueChanges.subscribe((value) => {
      this.changeVal(value);
    });
  }

  ngOnDestroy(): void {
    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterContentInit(): void {
    this.renderOptions();
  }

  renderOptions(): void {
    const groups = this.projectedGroups.toArray();

    let optionsInGroups = this.projectedOptionsInGroups.toArray();
    this.optionGroups = groups.map(group => {
      const options = optionsInGroups.filter((option: NzOptionComponent) => option.groupLabel === group.nzLabel);
      return { nzLabel: group.nzLabel, options };
    });

    this.flatOptions = this.projectedOptions.toArray();
    // console.log('render options');
    // console.log('optionGroups: ', this.optionGroups);
    // console.log('flatOptions: ', this.flatOptions);
  }

  writeValue(value: any): void {
    this.value.patchValue(value);
    console.log('writeValue');
  }
  registerOnChange(onChange: any): void {
    const sub = this.value.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: any): any {
    if (disabled) {
      this.value.disable();
    } else {
      this.value.enable();
    }
  }

  changeVal($event: any) {
    this.change.emit($event);
  }

  // fetchData(): any {
  //   this.nzOptions = [];
  //   if (this.items === null || this.items === undefined) {
  //     this.items = [];
  //   }
  //   const headers = {
  //     'x-skip-spinner': 'true',
  //   };
  //   if (this.apiUrl) {
  //     let filter = this.searchTerm ? `${this.labelName}|${FilterOperator.LIKE}|${this.searchTerm}` : '';
  //     if (this.currentValue && !this.isOpen) {
  //       filter = `${this.bindValue}|${FilterOperator.EQUAL}|${this.currentValue}`;
  //     }
  //     const params = {
  //       page: pageIndex,
  //       size: '10',
  //       filter
  //     };
  //     this.http.get<any>(`${ this.apiUrl}`, {headers: {'x-skip-spinner': 'true'}, params})
  //       .pipe(
  //         finalize(() => {
  //           // this is called on both success and error
  //           this.isLoading = false;
  //         })
  //       )
  //       .subscribe((res) => {
  //         if (!this.handleData.observers?.length) {
  //           if (this.config.displayCodeAndName) {
  //             this.listOptions = this.displayCodeAndNameHandle(res.data);
  //           } else {
  //             this.listOptions = res.data;
  //           }
  //
  //
  //           this.total = res.meta.total ?? res.data.length;
  //           if (this.config.sort) {
  //             this.listOptions.sort((obj1, obj2) => {
  //               if (obj1[this.labelName] > obj2[this.labelName]) {
  //                 return 1;
  //               }
  //
  //               if (obj1[this.labelName] < obj2[this.labelName]) {
  //                 return -1;
  //               }
  //
  //               return 0;
  //             });
  //           }
  //
  //           if (this.optionAdditional) {
  //             this.total = this.total + this.optionAdditional.length;
  //             this.listOptions = this.optionAdditional
  //               .concat(this.listOptions);
  //           }
  //         } else {
  //           this.handleData.emit({
  //             data: this.optionAdditional ? this.optionAdditional
  //               .concat(res.data) : res.data,
  //             setData: (data: any) => {
  //               this.listOptions = data;
  //             },
  //           });
  //         }
  //         this.listOptionsBuffer = this.listOptionsBuffer.concat(this.listOptions);
  //         this.listOptionsBuffer = this.listOptionsBuffer.filter(
  //           (person, index, self) =>
  //             index === self.findIndex((p) => p[this.bindValue] === person[this.bindValue])
  //         );
  //         // this.listOptionsBuffer = this.listOptions.slice(0, this.bufferSize);
  //       }, error => {
  //         this.isLoading = false;
  //         this.listOptions = [];
  //       });
  //   } else {
  //     this.total = this.items.length;
  //     this.listOptions = this.items;
  //     // this.listOptions.sort((obj1, obj2) => {
  //     //   if (obj1[this.labelName] > obj2[this.labelName]) {
  //     //     return 1;
  //     //   }
  //
  //     //   if (obj1[this.labelName] < obj2[this.labelName]) {
  //     //     return -1;
  //     //   }
  //
  //     //   return 0;
  //     // });
  //
  //     if (this.optionAdditional) {
  //       this.total = this.total + this.optionAdditional?.length;
  //       this.listOptions = this.optionAdditional
  //         .concat(this.listOptions.filter(e => e[this.labelName] !== this.optionAdditional.includes(o => o[this.labelName])));
  //     }
  //
  //     this.listOptionsBuffer = this.listOptions.slice(0, this.bufferSize);
  //     if (this.config.displayCodeAndName) {
  //       this.listOptionsBuffer = this.displayCodeAndNameHandle(this.listOptionsBuffer);
  //     }
  //   }
  //
  // }

  scrollToEnd(): void {
    this.currentPage += 1;
    this.handleCallApi();
  }

  handleCallApi(): void {
    if (this.isAll) {
      return;
    }
    if (this.apiUrl) {
      this.apiCalling = true;
      if (this.apiConfig.method === 'GET') {
        this.http.get<[any]>(this.apiUrl).subscribe({
          next: (value: any) => {
            this.handleDataApi(value.content, value.totalElements);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.apiCalling = false;
          }
        });
      } else {
        let body = {};
        if (this.apiConfig.paginate) {
          body = {
            page: this.currentPage,
            size: this.size,
          };
          if (this.apiConfig.searchText) {
            // @ts-ignore
            body[this.apiConfig.searchText] = this.searchText;
          }
        }

        this.http.post<any>(this.apiUrl, body).subscribe({
          next: (value: any) => {
            this.handleDataApi(value.content, value.totalElements);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.apiCalling = false;
          }
        });
      }
    }
  }

  onSearch($event: any): void {
    if (this.firstOpen) {
      this.firstOpen = false;
      return;
    }
    console.log($event);
    if (this.searchText != $event) {
      this.isAll = false;
    }
    this.nzOnSearch.emit($event);
    this.searchText = $event;
    this.currentPage = 0;
    this.listOptions = [];
    this.handleCallApi();
  }
}

import {
  AfterContentInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
  TemplateRef, ViewChild
} from '@angular/core';
import {
  NzFilterOptionType,
  NzSelectComponent,
  NzSelectItemInterface,
  NzSelectModeType,
  NzSelectModule
} from "ng-zorro-antd/select";
import {ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {NzSelectSizeType} from "ng-zorro-antd/select/select.component";
import {Subscription} from "rxjs";
import {InputBoolean} from "ng-zorro-antd/core/util";
import {BooleanInput} from "@angular/cdk/coercion";
import {GroupedOption} from "./models";

const defaultFilterOption: NzFilterOptionType = (searchValue: string, item: NzSelectItemInterface): boolean => {
  if (item && item.nzLabel) {
    return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  } else {
    return false;
  }
};

@Component({
  selector: 'app-custom-nz-select',
  standalone: true,
  imports: [
    NzSelectModule,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf
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


export class CustomNzSelectComponent implements ControlValueAccessor, OnInit, AfterContentInit, OnChanges, OnDestroy {
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
  @Input() optionGroups: GroupedOption[] = [];
  @Input() nzDropdownRender: TemplateRef<NzSafeAny> | null = null;
  @Input() nzTokenSeparators: string[] = [];

  @Output() nzOnSearch = new EventEmitter<string>();
  @Output() nzOnBlur = new EventEmitter<void>();
  @Output() nzOnFocus = new EventEmitter<void>();
  @Output() nzOnClear = new EventEmitter<void>();

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  onChangeSubs: Subscription[] = [];
  onTouched = () => {};

  onChange = (value: any) => {};


  ngOnInit(): void {
    this.value.valueChanges.subscribe((value) => {
      this.changeVal(value);
    });
    console.log('optionGroups: ', this.optionGroups);
  }

  ngOnDestroy(): void {
    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.items);
  }

  ngAfterContentInit(): void {
    console.log('optionGroups: ', this.optionGroups);
  }
  writeValue(value: any): void {
    this.value.patchValue(value);
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
    // console.log($event);
    this.change.emit($event);
  }

  onSearch(value: string) {
    this.nzOnSearch.emit(value);
  }

  isSelected(val: any): boolean {
    if (!this.hideSelected) {
      return false;
    }
    if (this.nzMode === 'multiple' || this.nzMode === 'tags') {
      return Array.isArray(this.value.value) && this.value.value.includes(val);
    }
    return this.value === val;
  }
}

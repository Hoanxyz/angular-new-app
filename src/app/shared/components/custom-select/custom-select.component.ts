import {
  AfterContentInit,
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
  NzFilterOptionType, NzOptionComponent,
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

const defaultFilterOption: NzFilterOptionType = (searchValue: string, item: NzSelectItemInterface): boolean => {
  if (item && item.nzLabel) {
    return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  } else {
    return false;
  }
};

export interface GroupedOption {
  label: string;
  options: {
    label: string;
    value: any;
    disabled?: boolean;
  }[];
}

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [
    NzSelectModule,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: CustomSelectComponent
    }
  ]
})


export class CustomSelectComponent implements AfterContentInit {
  @Input() placeholder = '';
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

  @ContentChildren(NzOptionComponent) projectedOptions!: QueryList<NzOptionComponent>;

  options: NzOptionComponent[] = [];

  ngAfterContentInit(): void {
    // Materialize projected options into an array so the template can use them
    this.options = this.projectedOptions.toArray();
  }

  protected readonly Infinity = Infinity;
}

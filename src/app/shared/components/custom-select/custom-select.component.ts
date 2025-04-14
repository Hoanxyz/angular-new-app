import {
  AfterContentInit, AfterViewInit,
  Component, ContentChild,
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
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {NzSelectSizeType} from "ng-zorro-antd/select/select.component";
import {Subscription} from "rxjs";
import {InputBoolean} from "ng-zorro-antd/core/util";
import {BooleanInput} from "@angular/cdk/coercion";


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
    NgIf,
    CommonModule
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


export class CustomSelectComponent {
  items = [
    { id: 1, name: 'Item One' },
    { id: 2, name: 'Item Two' },
    { id: 3, name: 'Item Three' }
  ];

  selectedItem: any;
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.isDropdownOpen = false;
  }
}

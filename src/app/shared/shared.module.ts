import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMoneyComponent } from './components/input-money/input-money.component';
import {TextTransformDirective} from "./directives/input/textTransform.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import { NewSelectCompComponent } from './components/new-select-comp/new-select-comp.component';
import { LpbFileComponent } from './components/lpb-file/lpb-file.component';
import { LpbMoneyInputNewComponent } from './components/lpb-money-input-new/lpb-money-input-new.component';
import { ValidateComponent } from './components/validate/validate.component';
// import { LpbDatepickerNewComponent } from './components/lpb-datepicker-new/lpb-datepicker-new.component';
// import { LpbPaginationComponent } from './components/lpb-pagination/lpb-pagination.component';
import { LpbPaginatorComponent } from './components/lpb-paginator/lpb-paginator.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgSelectModule} from "@ng-select/ng-select";
// import { LpbDatatableComponent } from './components/lpb-datatable/lpb-datatable.component';
// import { PrintDocsTableComponent } from './components/print-docs-table/print-docs-table.component';
// import { RequestContentComponent } from './components/request-content/request-content.component';



@NgModule({
  declarations: [
    InputMoneyComponent,
    TextTransformDirective,
    // NewSelectCompComponent,
    LpbFileComponent,
    LpbMoneyInputNewComponent,
    ValidateComponent,
    // LpbDatepickerNewComponent,
    // LpbPaginationComponent,
    LpbPaginatorComponent,
    // LpbDatatableComponent,
    // PrintDocsTableComponent,
    // RequestContentComponent
  ],
  exports: [
    InputMoneyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatTooltipModule,
    NgSelectModule
  ]
})
export class SharedModule { }

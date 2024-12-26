import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMoneyComponent } from './components/input-money/input-money.component';
import {TextTransformDirective} from "./directives/input/textTransform.directive";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    InputMoneyComponent,
    TextTransformDirective
  ],
  exports: [
    InputMoneyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }

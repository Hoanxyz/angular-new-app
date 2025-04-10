import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzSelectModule} from "ng-zorro-antd/select";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NzSelectModule,
    ReactiveFormsModule
  ],
  exports: [
  ]
})
export class CustomNzSelectModule { }

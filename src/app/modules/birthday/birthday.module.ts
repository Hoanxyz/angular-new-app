import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {BirthdayRoutingModule} from "./birthday-routing.module";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    BirthdayRoutingModule
  ]
})
export class BirthdayModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PostModule} from "./modules/posts/post.module";
import { HttpClientModule } from "@angular/common/http";
import {AdminRoutingModule} from "./modules/admin/admin-routing.module";
import {AdminModule} from "./modules/admin/admin.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import { ExampleContainerComponent } from './shared/components/example-container/example-container.component';
import { DynamicContentOneComponent } from './shared/components/dynamic-content-one/dynamic-content-one.component';
import { DynamicContentTwoComponent } from './shared/components/dynamic-content-two/dynamic-content-two.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    ExampleContainerComponent
  ],
  imports: [
    PostModule,
    AdminModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

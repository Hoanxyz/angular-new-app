import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NewYearModule} from "./modules/new-year/new-year.module";
import {NewYearRoutingModule} from "./modules/new-year/new-year-routing.module";
import {MatDialogModule} from "@angular/material/dialog";
import {ApiService} from "./shared/services/services.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {AuthInterceptor} from "./shared/services/jwt.interceptor";
import { UserDashboardComponent } from './shared/components/user-dashboard/user-dashboard.component';
import { DashboardSidebarComponent } from './shared/components/user-dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardUpdateAccountComponent } from './shared/components/user-dashboard/dashboard-update-account/dashboard-update-account.component';
import { DashboardUserInfoComponent } from './shared/components/user-dashboard/dashboard-user-info/dashboard-user-info.component';
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./modules/tour-of-heroes/services/in-memory-data.service";
import { HeroesModule } from './modules/router-sample/heroes/heroes.module';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NgSelectComponent} from "@ng-select/ng-select";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    DashboardSidebarComponent,
    DashboardUpdateAccountComponent,
    DashboardUserInfoComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NewYearModule,
    NewYearRoutingModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: 'en-US',
    }),

// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
//     HttpClientInMemoryWebApiModule.forRoot(
//       InMemoryDataService, { dataEncapsulation: false }
//     ),
    HeroesModule,
    NgSelectComponent
  ],
  providers: [
    ApiService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

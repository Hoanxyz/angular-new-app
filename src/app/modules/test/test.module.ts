import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { IndexComponent } from './index/index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { ChooseQuantityComponent } from './shared/components/choose-quantity/choose-quantity.component';
import {MatIconModule} from "@angular/material/icon";
import { AddressFormComponent } from './shared/components/address-form/address-form.component';
import {MatInputModule} from "@angular/material/input";
import { AdBannerComponent } from './banner/ad-banner/ad-banner.component';
import {AdDirective} from "./shared/directives/ad.directive";
import {AdService} from "./banner/ad.service";
import { UnlessDirective } from './shared/directives/unless.directive';
import { HeroesComponent } from './heroes/heroes/heroes.component';
import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import {UserService} from "./heroes/shared/user.service";
import {BetterLoggerService} from "./heroes/shared/better-logger.service";
import {LoggerService} from "./heroes/shared/logger.service";
import {HeroService} from "./heroes/shared/hero.service";
import { DynamicFormComponent } from './form/dynamic/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './form/dynamic/dynamic-form-question/dynamic-form-question.component';
import { ConfigComponent } from './http/config/config/config.component';
import {CustomSelectComponent} from "../../shared/components/custom-select/custom-select.component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {CustomNzSelectComponent} from "../../shared/components/custom-nz-select/custom-nz-select.component";
import {NzDividerModule} from "ng-zorro-antd/divider";

@NgModule({
    declarations: [
        IndexComponent,
        ChooseQuantityComponent,
        AddressFormComponent,
        AdBannerComponent,
        AdDirective,
        UnlessDirective,
        HeroesComponent,
        HeroListComponent,
        DynamicFormComponent,
        DynamicFormQuestionComponent,
        ConfigComponent,
    ],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    CustomSelectComponent,
    NzSelectModule,
    CustomNzSelectComponent,
    NzDividerModule,
  ],
    exports: [
        HeroesComponent
    ],
    providers: [
        {provide: LoggerService, useExisting: BetterLoggerService},
        AdService,
        UserService,
        HeroService
    ]
})
export class TestModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./components/index/index.component";
import {ComposeMessageComponent} from "./components/compose-message/compose-message.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'compose',
        component: ComposeMessageComponent,
        outlet: 'popup'
      },
      {
        path: 'crisis',
        loadChildren: () => import('./crisis-center/crisis-center.module').then(m => m.CrisisCenterModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'superheroes',
        loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
        data: { preload: true }
      },
      {path: '', redirectTo: '/router-sample/superheroes/heroes-list', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouterSampleRoutingModule { }

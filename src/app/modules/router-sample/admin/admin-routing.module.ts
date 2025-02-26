import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./components/admin/admin.component";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {ManageCrisesComponent} from "./components/manage-crises/manage-crises.component";
import {ManageHeroesComponent} from "./components/manage-heroes/manage-heroes.component";
import {AuthGuard} from "../auth/guard/auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'crises', component: ManageCrisesComponent },
          { path: 'heroes', component: ManageHeroesComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RestlistComponent} from './restlist/restlist.component';
import {RestaurantComponent} from './restaurant/restaurant.component' ;
import {TestComponent} from './test/test.component';
import {SuperAdminListComponent} from './super-admin-list/super-admin-list.component';
import {SuperAdminComponent} from './super-admin/super-admin.component';
import {OwnerListComponent} from './owner-list/owner-list.component';
import {OwnerComponent} from './owner/owner.component';
import {AdminListComponent} from './admin-list/admin-list.component';
import {AdminComponent} from './admin/admin.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {path: 'rest', component: RestlistComponent, canActivate: [AuthGuard]},
      {path: 'rest/:id', component: RestaurantComponent, canActivate: [AuthGuard]},
      {path: 'superadmin', component: SuperAdminListComponent, canActivate: [AuthGuard]},
      {path: 'superadmin/:id', component: SuperAdminComponent, canActivate: [AuthGuard]},
      {path: 'admin', component: AdminListComponent, canActivate: [AuthGuard]},
      {path: 'admin/:id', component: AdminComponent, canActivate: [AuthGuard]},
      {path: 'owner', component: OwnerListComponent, canActivate: [AuthGuard]},
      {path: 'owner/:id', component: OwnerComponent, canActivate: [AuthGuard]},
      {path: '', redirectTo: 'rest', pathMatch: 'full'}
   ]},
  {path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

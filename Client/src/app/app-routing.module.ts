import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './Dashboard/user-dashboard/user-dashboard/user-dashboard.component';
import { AdminCategoryComponent } from './Dashboard/category/category.component';
import { BookCardComponent } from './main-dashboard/components/category/book-card/book-card.component';
import {LoginComponent} from './auth/components/login/login.component'
import {RegisterComponent} from './auth/components/register/register.component'

const routes: Routes = [
  {path:"home",component:UserDashboardComponent},
  { path: 'categories/:id', component: BookCardComponent },
  { path: 'home/admin', component: AdminCategoryComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

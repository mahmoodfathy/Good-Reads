import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './Dashboard/user-dashboard/user-dashboard/user-dashboard.component';
import { AdminCategoryComponent } from './Dashboard/category/category.component';
import { BookCardComponent } from './main-dashboard/components/category/book-card/book-card.component';
import { CustomValidationService } from './auth/services/custom-validation.service';
import { AdminService } from './Services/admin.service';

const routes: Routes = [
  {
    path: 'home',
    component: UserDashboardComponent,
    canActivate: [CustomValidationService],
  },
  { path: 'categories/:id', component: BookCardComponent },
  {
    path: 'home/admin',
    component: AdminCategoryComponent,
    canActivate: [AdminService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

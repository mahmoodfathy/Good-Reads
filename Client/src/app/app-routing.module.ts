import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './Dashboard/user-dashboard/user-dashboard/user-dashboard.component';
import { BookDetailsComponent } from './Dashboard/book-details/book-details/book-details.component';
import { CategoryComponent } from './Dashboard/category/category.component';
import { BookCardComponent } from './Shared/book-card/book-card.component';
import { CategoriesComponent } from './Shared/categories/categories.component';

const routes: Routes = [
  {path:"home",component:UserDashboardComponent},
  { path: 'categories/:id', component: BookCardComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'home/admin', component: CategoryComponent },
  { path: 'categories', component: CategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

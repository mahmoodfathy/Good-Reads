import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './Dashboard/category/category.component';
import { BookCardComponent } from './Shared/book-card/book-card.component';
import { CategoriesComponent } from './Shared/categories/categories.component';

const routes: Routes = [
  { path: 'categories/:id', component: BookCardComponent },
  { path: 'home/admin', component: CategoryComponent },
  { path: 'categories', component: CategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

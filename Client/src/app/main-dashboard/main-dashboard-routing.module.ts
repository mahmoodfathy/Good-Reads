import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookDetailsComponent } from './components/book/book-details/book-details.component';
import { ListAllBooksComponent } from './components/book/list-all-books/list-all-books.component';
import { ListAllCategoriesComponent } from './components/category/list-all-categories/list-all-categories.component';
import { ListAllAuthorsComponent} from './components/authors/list-all-authors/list-all-authors.component';
import { BookCardComponent } from './components/category/book-card/book-card.component';
import { AuthorDetailsComponent} from './components/authors/author-details/author-details.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { RegisterComponent } from '../auth/components/register/register.component';


const navBarRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'author', component:  ListAllAuthorsComponent},
  {path: 'category',component: ListAllCategoriesComponent },
  {path: 'book',component: ListAllBooksComponent},
  {path: 'book/:id',component: BookDetailsComponent},
  {path: 'category/:id',component: BookCardComponent},
  {path: 'author/:id',component:AuthorDetailsComponent},
  {path:'signin',component:LoginComponent},
  {path:'signup',component:RegisterComponent}


];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(navBarRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class MainDashboardRoutingModule { }

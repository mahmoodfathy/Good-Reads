import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookDetailsComponent } from './components/book/book-details/book-details.component';
import { ListAllBooksComponent } from './components/book/list-all-books/list-all-books.component';
import { ListAllCategoriesComponent } from './components/category/list-all-categories/list-all-categories.component';
import { ListAllAuthorsComponent} from './components/authors/list-all-authors/list-all-authors.component';
import { CategoryDetailsComponent } from './components/category/category-details/category-details.component';
import { AuthorDetailsComponent} from './components/authors/author-details/author-details.component';
import {AuthModule} from "../Auth/auth/auth.module"
import { SignupComponent } from '../Auth/signup/signup.component';
import { SigninComponent } from '../Auth/signin/signin.component';


const navBarRoutes: Routes = [
  {path:'',redirectTo:"/home",pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path: 'author', component:  ListAllAuthorsComponent},
  {path: 'category',component: ListAllCategoriesComponent },
  {path: 'book',component: ListAllBooksComponent},
  {path: 'book/:id',component: BookDetailsComponent},
  {path: 'category/:id',component: CategoryDetailsComponent},
  {path: 'author/:id',component:AuthorDetailsComponent},
  // {path:'signin',component:SigninComponent},
  // {path:'signup',component:SignupComponent}


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

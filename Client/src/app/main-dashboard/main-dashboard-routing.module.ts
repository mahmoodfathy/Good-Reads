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



const navBarRoutes: Routes = [
  {path:'',redirectTo:"/home",pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path: 'author', component:  ListAllAuthorsComponent},
  {path: 'category',component: ListAllCategoriesComponent },
  {path: 'book',component: ListAllBooksComponent},
  {path: 'books/33',component: BookDetailsComponent},
  {path: 'category/878',component: CategoryDetailsComponent},
  {path: 'authors/432',component:AuthorDetailsComponent}

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

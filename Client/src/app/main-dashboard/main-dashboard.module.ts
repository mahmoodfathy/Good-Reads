import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { MainDashboardRoutingModule } from './main-dashboard-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { SearchComponent } from './components/search/search.component';
import {AuthModule} from '../Auth/auth/auth.module';
import { PopularBooksComponent } from './components/book/popular-books/popular-books.component';
import { PopularAuthorsComponent } from './components/authors/popular-authors/popular-authors.component';
import { PopularCategoriesComponent } from './components/category/popular-categories/popular-categories.component';
import { BookDetailsComponent } from './components/book/book-details/book-details.component';
import { AuthorDetailsComponent } from './components/authors/author-details/author-details.component';
import { ListAllAuthorsComponent } from './components/authors/list-all-authors/list-all-authors.component';
import { ListAllBooksComponent } from './components/book/list-all-books/list-all-books.component';
import { ListAllCategoriesComponent } from './components/category/list-all-categories/list-all-categories.component';
import { CategoryDetailsComponent } from './components/category/category-details/category-details.component';
import { BookReviewsComponent } from './components/book/book-details/book-reviews/book-reviews.component';
import { AuthorBooksComponent } from './components/authors/author-details/author-books/author-books.component';
import { FooterComponent } from './components/footer/footer.component';
import {BooksService} from "../Services/books.service";
import {HttpClientModule} from "@angular/common/http";
import { BooksComponent } from './components/book/books/books.component';
import {AuthorsService} from "../Services/authors.service";
import {CategoriesService} from "../Services/categories.service";
import { AuthorComponent } from './components/authors/author/author.component';



@NgModule({
  declarations: [NavBarComponent, HomeComponent, MainDashboardComponent, SearchComponent, PopularBooksComponent, PopularAuthorsComponent, PopularCategoriesComponent, BookDetailsComponent, AuthorDetailsComponent, ListAllAuthorsComponent, ListAllBooksComponent, ListAllCategoriesComponent, CategoryDetailsComponent, BookReviewsComponent, AuthorBooksComponent, FooterComponent, BooksComponent, AuthorComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MainDashboardRoutingModule,
    AuthModule
  ],
  providers:[BooksService,AuthorsService,CategoriesService],
  exports:[MainDashboardComponent]
})
export class MainDashboardModule { }

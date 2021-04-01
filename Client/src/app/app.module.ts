import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './Dashboard/category/category.component';
import { UserDashboardComponent } from './Dashboard/user-dashboard/user-dashboard.component';
import { BooksTableComponent } from './Dashboard/user-dashboard/books-table/books-table.component';
import { UserBooksService } from './Services/userBooks.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

/*import { SignupComponent } from './Auth/Signup/signup/signup.component';
import { SigninComponent } from './Auth/signin/signin.component';*/

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    UserDashboardComponent,
    BooksTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    UserBooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

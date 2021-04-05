import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './Dashboard/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDashboardModule } from './Dashboard/user-dashboard/user-dashboard.module';
import { SignupComponent } from './Auth/signup/signup.component';
import { SigninComponent } from './Auth/signin/signin.component';
import { DashboardModule } from './Dashboard/dashboard/dashboard.module';
import { BookDetailsModule } from './Dashboard/book-details/book-details.module';
import { BookCardComponent } from './Shared/book-card/book-card.component';
import { CategoriesComponent } from './Shared/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent, 
    SigninComponent, 
    BookCardComponent, 
    CategoriesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    UserDashboardModule,
    DashboardModule,
    BookDetailsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

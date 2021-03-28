import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './Dashboard/category/category.component';
import { SignupComponent } from './Auth/Signup/signup/signup.component';
import { SigninComponent } from './Auth/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

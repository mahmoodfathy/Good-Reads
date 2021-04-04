import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './Dashboard/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDashboardModule } from './Dashboard/user-dashboard/user-dashboard.module';

/*import { SignupComponent } from './Auth/Signup/signup/signup.component';
import { SigninComponent } from './Auth/signin/signin.component';*/

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    UserDashboardModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './Auth/signin/signin.component';
import { MainDashboardModule } from './main-dashboard/main-dashboard.module';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import {AdminDashboardModule} from './admin-dashboard/admin-dashboard.module'

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MainDashboardModule,
    UserDashboardModule,
    AdminDashboardModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

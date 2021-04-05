import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainDashboardModule } from './main-dashboard/main-dashboard.module';
import {AuthModule} from './Auth/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    AppRoutingModule,
    MainDashboardModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

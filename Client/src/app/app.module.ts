import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { MainDashboardModule } from './main-dashboard/main-dashboard.module';
import {AuthModule} from './Auth/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import{ UserDashboardModule } from './Dashboard/user-dashboard/user-dashboard.module';
import { DashboardModule } from './Dashboard/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    MainDashboardModule,
    NgbModule,
    UserDashboardModule,
    DashboardModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]

})
export class AppModule {}

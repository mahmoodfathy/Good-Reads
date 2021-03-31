import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ShelfComponent } from './components/shelf/shelf.component';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';



@NgModule({
  declarations: [SideBarComponent, ShelfComponent],
  imports: [
    CommonModule,
    UserDashboardRoutingModule
  ]
})
export class UserDashboardModule { }

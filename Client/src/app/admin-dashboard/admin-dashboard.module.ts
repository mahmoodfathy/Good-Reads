import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookModalComponent } from './components/books/book-modal/book-modal.component';
import { BookTableComponent } from './components/books/book-table/book-table.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import {AdminService} from "../Services/admin.service";



@NgModule({
  declarations: [ BookModalComponent, BookTableComponent, AdminDashboardComponent],
  imports: [
    CommonModule
  ],providers:[AdminService]
})
export class AdminDashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BooksTableComponent } from './user-dashboard/books-table/books-table.component';
import { UserBooksService } from '../../Services/userBooks.service';


@NgModule({
  declarations: [
    UserDashboardComponent,
    BooksTableComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    UserBooksService
  ],
  exports: [
    UserDashboardComponent,
    BooksTableComponent
  ]
})
export class UserDashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BooksTableComponent } from './user-dashboard/books-table/books-table.component';
import { UserBooksService } from '../../Services/userBooks.service';

import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [UserDashboardComponent, BooksTableComponent],
  imports: [CommonModule, RatingModule],
  providers: [UserBooksService],
  exports: [UserDashboardComponent, BooksTableComponent],
})
export class UserDashboardModule {}

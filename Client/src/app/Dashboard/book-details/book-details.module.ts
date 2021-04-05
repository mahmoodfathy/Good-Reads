import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ReviewsComponent } from './book-details/reviews/reviews.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [BookDetailsComponent, ReviewsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    BookDetailsComponent
  ]
})
export class BookDetailsModule { }

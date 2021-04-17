import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// import { Book } from 'src/app/Dashboard/booktable/booktable.component';
import { Book } from '../../../../models/book';
import { FilterCategoryService } from 'src/app/Services/filter-category.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit {
  constructor(
    private myActivatedRoute: ActivatedRoute,
    private myService: FilterCategoryService
  ) {}
  books: Book[];
  subscriber: Subscription;
  id = '';
  error: any;
  ngOnInit(): void {
    this.id = this.myActivatedRoute.snapshot.params.id;
    this.subscriber = this.myService.getCategoryBooks(this.id).subscribe(
      (res: any) => {
        // console.log(res);
        this.books = res;
        //console.log(res.status);
      },
      (err: any) => {
        this.error = err;
      }
    );
  }
}

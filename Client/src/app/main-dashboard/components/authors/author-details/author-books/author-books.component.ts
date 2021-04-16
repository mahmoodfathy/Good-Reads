import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorsService } from '../../../../../Services/authors.service';
import { Book } from '../../../../../models/book';
import { UserBooksService } from '../../../../../Services/userBooks.service';
import { CustomValidationService } from '../../../../../auth/services/custom-validation.service';
import { PaginationService } from '../../../../../Services/pagination.service';

@Component({
  selector: 'app-author-books',
  templateUrl: './author-books.component.html',
  styleUrls: ['./author-books.component.css'],
})
export class AuthorBooksComponent implements OnInit, OnDestroy {
  constructor(
    private getOneAuthorService: AuthorsService,
    private authorActivatedRoute: ActivatedRoute,
    private shelfService: UserBooksService,
    private authService: CustomValidationService,
    private pagerService: PaginationService
  ) {}
  books: Book[];
  subscriber: any;
  selectedValue: string = '';
  totalStars = 5;
  addToShelfSubscriber: any;
  updateShelfSubscriber: any;
  authSubscriber: any;
  selectedMenueId: String;
  body: { bookId: any; shelf: string };
  isAutharized: boolean = true;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  setSelectedValue(event: any) {
    this.selectedValue = event.target.value;
    this.selectedMenueId = event.target.id;
    console.log(this.selectedValue);
    console.log(this.selectedMenueId);
    if (this.isAutharized) {
      this.body = { bookId: this.selectedMenueId, shelf: this.selectedValue };
      this.addToShelfSubscriber = this.shelfService
        .addBookToUser(this.body)
        .subscribe(
          (res: any) => {
            console.log('Book Added Successfully');
          },
          (error) => {
            console.log(error);
          }
        );
      this.updateShelfSubscriber = this.shelfService
        .updateUserShelf(this.body)
        .subscribe(
          (res: any) => {
            console.log('book Updated Successfully');
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      console.log('error');
    }
  }

  ngOnInit(): void {
    this.authSubscriber = this.authService.isAuthenticated.subscribe(
      (res: boolean) => {
        console.log(res);
        this.isAutharized = res;
      },
      (error) => {
        console.log(error);
      }
    );
    this.subscriber = this.getOneAuthorService
      .getAuthorBooks(this.authorActivatedRoute.snapshot.params.id)
      .subscribe(
        (res: any) => {
          this.books = res.body;
          // initialize to page 1
          this.setPage(1);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.books.length, page);
    // get current page of items
    this.pagedItems = this.books.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
  ngOnDestroy(): void {
    if (this.subscriber) this.subscriber.unsubscribe();
    if (this.addToShelfSubscriber) this.addToShelfSubscriber.unsubscribe();
    if (this.updateShelfSubscriber) this.updateShelfSubscriber.unsubscribe();
    if (this.authSubscriber) this.authSubscriber.unsubscribe();
  }
}

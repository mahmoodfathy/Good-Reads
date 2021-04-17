import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingComponent } from 'ng-starrating';
import { BookService } from 'src/app/Services/book.service';
import { UserBooksService } from 'src/app/Services/userBooks.service';
import { CustomValidationService } from 'src/app/auth/services/custom-validation.service';
import { IUser } from 'src/app/auth/IUser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private bookService: BookService,
    private userBooksService: UserBooksService,
    private myActivatedRoute: ActivatedRoute,
    private myService: CustomValidationService
  ) {}

  subscriber: any;
  secondSubscriber: any;
  id: string = '';
  bookDetails: any = {};
  review: string = '';
  rating: number = 5;
  reviews: Array<any> = [];
  isLoading: boolean = false;
  selectedValue: string = 'want to read';
  readOnly: boolean = false;
  error: any;
  userInfo: IUser;
  userInfoSubscriber: Subscription;
  authSubscriber: Subscription;
  isAuth: boolean;
  userId: string;

  setSelectedValue(event: any) {
    this.selectedValue = event.target.value;
  }

  handleShelfUpdate() {
    this.isLoading = true;

    let body: { bookId: string; shelf: string } = {
      bookId: this.id,
      shelf: this.selectedValue,
    };
    console.log(this.selectedValue);
    this.subscriber = this.userBooksService.addBookToUser(body).subscribe(
      (respoonse: any) => {
        this.isLoading = false;
        this.selectedValue = 'want to read';
        this.modalService.dismissAll();
      },
      (err) => {
        this.secondSubscriber = this.userBooksService
          .updateUserShelf(body)
          .subscribe(
            (response: any) => {
              this.isLoading = false;
              this.selectedValue = 'want to read';
              this.modalService.dismissAll();
            },
            (err) => {
              console.log(err);
              this.isLoading = false;
              this.selectedValue = 'want to read';
              this.modalService.dismissAll();
            }
          );
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
    if (this.secondSubscriber) this.secondSubscriber.unsubscribe();
    if (this.userInfoSubscriber) this.userInfoSubscriber.unsubscribe();
  }

  myForm = new FormGroup({
    review: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  ngOnInit(): void {
    this.authSubscriber = this.myService.isAuthenticated.subscribe(
      (res: boolean) => {
        this.isAuth = res;
      },
      (error) => {
        console.log(error);
      }
    );

    this.id = this.myActivatedRoute.snapshot.params.id;
    this.userInfoSubscriber = this.myService
      .getUserInfo()
      .subscribe((res: any) => {
        this.userInfo = res;
        this.userId = res.id || res._id;
      });
    this.subscriber = this.bookService.getBookById(this.id).subscribe(
      (response: any) => {
        console.log(response);
        this.bookDetails = response;
        this.reviews = response.reviews;
      },
      (err) => {
        this.error = err;
        console.log(err);
      }
    );
    console.log(this.userInfo);
  }

  addReview() {
    let body: any = {
      userId: this.userInfo._id || this.userId,
      userName: this.userInfo.username,
      text: this.review,
    };
    this.isLoading = true;
    this.subscriber = this.bookService.addReviewToBook(this.id, body).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.review = '';
        console.log(response);
        this.bookDetails = response;
        this.reviews = response.reviews;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  onRate($event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }) {
    let body: any = {
      userId: this.userInfo._id || this.userId,
    };

    this.readOnly = true;
    this.subscriber = this.bookService
      .addRatingToBook(this.id, $event.newValue, body)
      .subscribe(
        (response: any) => {
          this.bookDetails = response;
          this.reviews = response.reviews;
          this.readOnly = false;
          console.log(response);
        },
        (err) => {
          console.log(err);
          this.readOnly = false;
        }
      );
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}

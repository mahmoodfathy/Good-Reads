import { Component, OnInit } from '@angular/core';
import { UserBooksService } from '../../../Services/userBooks.service';
import { BookService } from '../../../Services/book.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(private modalService: NgbModal, private bookService:BookService, private userBooksService:UserBooksService, private myActivatedRoute:ActivatedRoute) { }
  
  subscriber:any;
  secondSubscriber:any;
  id:string = '';
  bookDetails:any = {};
  review:string = "";
  rating:number = 5;
  reviews:Array<any> = [];
  isLoading:boolean = false;
  selectedValue:string = "want to read";
  
  setSelectedValue(event:any){
    this.selectedValue = event.target.value;
  }
  
  handleShelfUpdate(){
    this.isLoading = true;
    let body:{bookId: string, shelf: string} = {bookId: this.id, shelf: this.selectedValue};
    this.subscriber = this.userBooksService.addBookToUser(body)
    .subscribe((respoonse:any) => {
      this.isLoading = false;
      this.selectedValue = "want to read";
      this.modalService.dismissAll();
    }, (err) => {
      
      this.secondSubscriber = this.userBooksService.updateUserShelf(body)
      .subscribe((response:any) => {
        this.isLoading = false;
        this.selectedValue = "want to read";
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        this.isLoading = false;
        this.selectedValue = "want to read";
        this.modalService.dismissAll();
      });
      
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
    this.secondSubscriber.unsubscribe();
  }
  
  myForm= new FormGroup({
    review:new FormControl('',[Validators.required, Validators.minLength(10)])
  })
  
  ratingForm= new FormGroup({
    rating:new FormControl('',[])
  })

  ngOnInit(): void {
    this.id = this.myActivatedRoute.snapshot.params.id;
    this.subscriber = this.bookService.getBookById(this.id)
    .subscribe((response:any)=>{
      console.log(response);
      this.bookDetails = response;
      this.reviews = response.reviews;
    },
    (err)=>{
      console.log(err)
    }
    )
  }
  
  addReview(){
    let body:any = {
      userId: "60550e28eccf94ea1ccc8195",
      userName: "islamHany",
      text: this.review
    };
    this.isLoading = true;
    this.subscriber = this.bookService.addReviewToBook(this.id, body)
    .subscribe((response:any)=>{
      this.isLoading = false;
      this.review = "";
      console.log(response);
      this.bookDetails = response;
      this.reviews = response.reviews;
    },
    (err)=>{
      this.isLoading = false;
      console.log(err)
    }
    )
  }
  
  addRating(){
    let body:any = {
      userId: "60550e28eccf94ea1ccc8195"
    };
    this.isLoading = true;
    this.subscriber = this.bookService.addRatingToBook(this.id, this.rating, body)
    .subscribe((response:any) => {
      this.bookDetails = response;
      this.reviews = response.reviews;
      this.isLoading = false;
    }, err => {
      console.log(err);
      this.isLoading = false;
    });
  }
  
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}

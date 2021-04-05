import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../Services/book.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(private bookService:BookService, private myActivatedRoute:ActivatedRoute) { }
  
  subscriber:any;
  id:string = '';
  bookDetails:any = {};
  review:string = "";
  reviews:Array<any> = [];
  isLoading:boolean = false;

  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
  
  myForm= new FormGroup({
    review:new FormControl('',[Validators.required, Validators.minLength(10)])
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
}

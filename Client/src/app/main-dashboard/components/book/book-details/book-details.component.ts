import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksService} from "../../../../Services/books.service";
import {ActivatedRoute} from "@angular/router";
import {Book} from '../../../../models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit ,OnDestroy{

  constructor(private getOneBookService:BooksService,private bookActivatedRoute:ActivatedRoute) { }
  bookDetails:Book={_id:2,name:'',cover:"",review:'',author:{_id:0},category:{_id:0},description:'',rating:0,addedDate:new Date(),totalRatingCount:0,totalRatingValue:0,totalReviewsCount:0,details:[{Characters:'',EditionLanguage:'',OriginalTitle:'',Paperback:'',PublishedDate:''}]};
  subscriber:any;
  ngOnInit(): void {
    this.subscriber=this.getOneBookService.getBookById(this.bookActivatedRoute.snapshot.params.id)
      .subscribe((res:any)=>{
        this.bookDetails=res.body;
      },(error)=>{
        console.log(error);
        }
      )
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}

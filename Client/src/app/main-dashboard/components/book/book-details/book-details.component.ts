import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksService} from "../../../../Services/books.service";
import {ActivatedRoute} from "@angular/router";
import {Books} from '../../../../models/books';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit ,OnDestroy{

  constructor(private getOneBookService:BooksService,private bookActivatedRoute:ActivatedRoute) { }
  bookDetails:Books={id:2,name:'ali',image:"URL",review:'',author:'',category:''};
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

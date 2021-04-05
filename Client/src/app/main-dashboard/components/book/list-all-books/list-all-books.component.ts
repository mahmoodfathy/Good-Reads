import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksService} from "../../../../Services/books.service";

@Component({
  selector: 'app-list-all-books',
  templateUrl: './list-all-books.component.html',
  styleUrls: ['./list-all-books.component.css']
})
export class ListAllBooksComponent implements OnInit,OnDestroy {
  constructor(private listBooks:BooksService) { }
  books:Array<{_id:number,image:String,category:number,author:number}>=[];
  subscriber:any;
  ngOnInit(): void {
    this.subscriber=this.listBooks.getAllBooks()
      .subscribe((res:any)=>{
        console.log(res.body);
        this.books = res.body;
    },
      (error)=>{
      console.log(error);
      }
    );
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}

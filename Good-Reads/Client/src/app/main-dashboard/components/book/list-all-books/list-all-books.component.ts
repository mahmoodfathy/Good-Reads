import {Component, OnDestroy, OnInit} from '@angular/core';
import { from } from 'rxjs';
import {BooksService} from "../../../../Services/books.service";
import {Book} from '../../../../models/book'

@Component({
  selector: 'app-list-all-books',
  templateUrl: './list-all-books.component.html',
  styleUrls: ['./list-all-books.component.css']
})
export class ListAllBooksComponent implements OnInit,OnDestroy {
  books:Array<Book>;
  totalRecords:number;
  page:number=1;
  subscriber:any;
  constructor(private listBooks:BooksService) {
    this.books=new Array<Book>()
   }
  
  ngOnInit(): void {
    this.subscriber=this.listBooks.getAllBooks()
      .subscribe((res:any)=>{
        console.log(res.body);
        this.books = res.body;
        this.totalRecords=res.body.length
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

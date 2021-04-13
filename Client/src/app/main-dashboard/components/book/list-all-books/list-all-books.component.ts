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
  constructor(private listBooks:BooksService) { }
  books:Array<Book>;
  subscriber:any;
  totalRecords:number;
  page:number=1;
  
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

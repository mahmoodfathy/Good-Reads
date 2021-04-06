import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../../../Services/books.service";
import {Book} from '../../../../models/book'

@Component({
  selector: 'app-popular-books',
  templateUrl: './popular-books.component.html',
  styleUrls: ['./popular-books.component.css']
})
export class PopularBooksComponent implements OnInit {

  constructor(private listPopularBooks:BooksService) { }
  popularBooks:Array<Book>;
  subscriber:any;
  ngOnInit(): void {
    this.subscriber=this.listPopularBooks.getPopularBooks()
      .subscribe((res:any)=>{
          console.log(res);
          this.popularBooks =res.body;
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

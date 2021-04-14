import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthorsService} from '../../../../../Services/authors.service';
import {Book} from '../../../../../models/book';

@Component({
  selector: 'app-author-books',
  templateUrl: './author-books.component.html',
  styleUrls: ['./author-books.component.css']
})
export class AuthorBooksComponent implements OnInit {
  constructor(private getOneAuthorService:AuthorsService,private authorActivatedRoute:ActivatedRoute) { }
  books: Book[];
  subscriber:any;
  ngOnInit(): void {
    this.subscriber=this.getOneAuthorService.getAuthorBooks(this.authorActivatedRoute.snapshot.params.id)
      .subscribe((res:any)=>{
          console.log(this.books=res.body);
        },(error)=>{
          console.log(error);
        }
      )
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}

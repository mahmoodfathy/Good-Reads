import {Component, Input, OnInit} from '@angular/core';
import{Book} from '../../../../models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}
  @Input('bookCard') book:Book;

}

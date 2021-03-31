import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}
  @Input('bookLogo') book:{_id:number,image:String,category:String,author:String}={_id:4,image:"URL",category:"fiction",author:"mohamed"};

}

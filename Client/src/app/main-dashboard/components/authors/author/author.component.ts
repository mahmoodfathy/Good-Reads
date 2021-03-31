import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  constructor() { }
  @Input('authorLogo') author:{_id:number,image:String,firstName:String,lastName:String}={_id:1,image:"URL",firstName:'',lastName:''};
  ngOnInit(): void {
  }

}

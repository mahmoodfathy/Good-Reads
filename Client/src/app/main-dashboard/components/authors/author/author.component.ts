import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  constructor() { }
  @Input('authorLogo') author:{_id:number,imageURL:String,firstname:String,lastname:String}={_id:0,imageURL:'',firstname:'',lastname:''};
  ngOnInit(): void {
  }

}

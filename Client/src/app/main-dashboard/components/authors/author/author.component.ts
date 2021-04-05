import {Component, Input, OnInit} from '@angular/core';
import {Author} from '../../../../models/author'

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  constructor() { }
  @Input('authorCard') author:Author={_id:0,firstname:'',lastname:'',imageURL:'',shortDescription:'',dob:new Date(),book:[{_id:0}]};
  ngOnInit(): void {
  }

}

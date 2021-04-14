import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorsService} from "../../../../Services/authors.service";
import {Author} from '../../../../models/author';

@Component({
  selector: 'app-list-all-authors',
  templateUrl: './list-all-authors.component.html',
  styleUrls: ['./list-all-authors.component.css']
})
export class ListAllAuthorsComponent implements OnInit,OnDestroy {
  totalRecords:number;
  page:number=1;
  subscriber:any;
  constructor(private listAuthors:AuthorsService) { }
  Authors:Array<Author>=[{_id:0,firstname:'',lastname:'',shortdescription:'',dob:new Date(),imageUrl:'',book:[{_id:0}]}];
  ngOnInit(): void {
    this.subscriber=this.listAuthors.getAllAuthors()
      .subscribe((res:any)=>{
          console.log(res);
          this.Authors =res.body;
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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorsService} from "../../../../Services/authors.service";

@Component({
  selector: 'app-list-all-authors',
  templateUrl: './list-all-authors.component.html',
  styleUrls: ['./list-all-authors.component.css']
})
export class ListAllAuthorsComponent implements OnInit,OnDestroy {

  constructor(private listAuthors:AuthorsService) { }
  Authors:Array<{id:number,image:String,firstName:String,lastName:String}>=[];
  subscriber:any;
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

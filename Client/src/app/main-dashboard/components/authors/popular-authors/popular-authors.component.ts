import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorsService} from "../../../../Services/authors.service";
import {Author} from "../../../../models/author";
@Component({
  selector: 'app-popular-authors',
  templateUrl: './popular-authors.component.html',
  styleUrls: ['./popular-authors.component.css']
})
export class PopularAuthorsComponent implements OnInit,OnDestroy {

  constructor(private listPopularAuthors:AuthorsService) { }
  popularAuthors:Array<{_id:number,imageURL:String,firstname:String,lastname:String}>=[];
  subscriber:any;
  ngOnInit(): void {
    this.subscriber=this.listPopularAuthors.getPopularAuthors()
      .subscribe((res:any)=>{
          console.log(res);
          this.popularAuthors =res.body;
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

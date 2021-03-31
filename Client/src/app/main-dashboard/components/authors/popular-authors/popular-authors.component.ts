import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorsService} from "../../../../Services/authors.service";

@Component({
  selector: 'app-popular-authors',
  templateUrl: './popular-authors.component.html',
  styleUrls: ['./popular-authors.component.css']
})
export class PopularAuthorsComponent implements OnInit,OnDestroy {

  constructor(private listPopularAuthors:AuthorsService) { }
  popularAuthors:Array<{id:number,image:String,name:String}>=[];
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

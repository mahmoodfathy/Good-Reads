import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorsService} from "../../../../Services/authors.service";
import {ActivatedRoute} from "@angular/router";
import {Authors} from "../../../../models/authors";


@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit ,OnDestroy{
  constructor(private getOneAuthorService:AuthorsService,private authorActivatedRoute:ActivatedRoute) { }
  AuthorsDetails:Authors ={ _id:5,firstname:'dc',lastname:'cc',image:'',dob:'1-3-2009',shortDescription:'dkmvdo'};
  subscriber:any;
  ngOnInit(): void {
    this.subscriber=this.getOneAuthorService.getAuthorById(this.authorActivatedRoute.snapshot.params.id)
      .subscribe((res:any)=>{
          this.AuthorsDetails=res.body;
        },(error)=>{
          console.log(error);
        }
      )
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}

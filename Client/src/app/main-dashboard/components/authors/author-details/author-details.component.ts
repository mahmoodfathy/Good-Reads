import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorsService} from "../../../../Services/authors.service";
import {ActivatedRoute} from "@angular/router";
import {Author} from "../../../../models/author";


@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit ,OnDestroy{
  constructor(private getOneAuthorService:AuthorsService,private authorActivatedRoute:ActivatedRoute) { }
  AuthorsDetails:Author ={ _id:5,firstname:'dc',lastname:'cc',imageURL:'',dob:new Date(),shortDescription:'',book:[{_id:0}]};
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

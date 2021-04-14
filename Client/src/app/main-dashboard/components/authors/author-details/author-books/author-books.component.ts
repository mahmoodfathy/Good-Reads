import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthorsService} from '../../../../../Services/authors.service';
import {Book} from '../../../../../models/book';
import { UserBooksService } from '../../../../../Services/userBooks.service';
import {CustomValidationService } from "../../../../../auth/services/custom-validation.service"

@Component({
  selector: 'app-author-books',
  templateUrl: './author-books.component.html',
  styleUrls: ['./author-books.component.css']
})
export class AuthorBooksComponent implements OnInit, OnDestroy {

  constructor(private getOneAuthorService:AuthorsService,private authorActivatedRoute:ActivatedRoute, private shelfService:UserBooksService,private authService:CustomValidationService) { }
  books: Book[];
  subscriber:any;
  selectedValue:string="";
  totalStars=5;
  addToShelfSubscriber:any;
  updateShelfSubscriber:any;
  authSubscriber:any;
  selectedMenueId:String;
  body:{bookId: any, shelf: string};
  isAutharized:boolean=true;

  setSelectedValue(event:any){
    this.selectedValue = event.target.value;
    this.selectedMenueId=event.target.id;
    console.log(this.selectedValue);  
    console.log(this.selectedMenueId);
    if(this.isAutharized){
      this.body= {bookId: this.selectedMenueId, shelf: this.selectedValue};
      this.addToShelfSubscriber=this.shelfService.addBookToUser(this.body)
        .subscribe((res:any)=>{
            console.log("Book Added Successfully");
          },(error)=>{
            console.log(error);
          }
        )
        this.updateShelfSubscriber=this.shelfService.updateUserShelf(this.body)
        .subscribe((res:any)=>{
            console.log("book Updated Successfully");
          },(error)=>{
            console.log(error);
          }
        )
    }
    else{
      console.log("error");
      
    }
   
  }
 
  ngOnInit(): void {
    this.authSubscriber=this.authService.isAuth()
      .subscribe((res:boolean)=>{
         console.log(res);
          this.isAutharized=res;
        },(error)=>{
          console.log(error);
        }
      )
    this.subscriber=this.getOneAuthorService.getAuthorBooks(this.authorActivatedRoute.snapshot.params.id)
      .subscribe((res:any)=>{
          console.log(this.books=res.body);
        },(error)=>{
          console.log(error);
        }
      )
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
    this.addToShelfSubscriber.unsubscribe();
    this.updateShelfSubscriber.unsubscribe();
    this.authSubscriber.unsubscribe();
  }  
}
 
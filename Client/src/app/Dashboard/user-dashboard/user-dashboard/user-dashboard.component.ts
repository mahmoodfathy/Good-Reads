import { Component, OnInit } from '@angular/core';
import { UserBooksService } from '../../../Services/userBooks.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private UserBooksService:UserBooksService) { }
  
  userBooks:Array<any> = [];
  filteredArray:Array<any> = this.userBooks;
  subscriber:any;
  filterType:string = "all";
  
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }

  ngOnInit(): void {
    //this.userBooks = this.UserBooksService.getUserBooks();
    this.subscriber = this.UserBooksService.getUserBooks()
    .subscribe((response:any)=>{
      console.log(response)
      this.userBooks = response.books;
      this.filteredArray = response.books;
    },
    (err)=>{
      console.log(err)
    }
    )
  }
  
  filterByShelf = (filterType:string) => {
    let newArr = [];
    newArr = this.userBooks.filter(bookObj => bookObj.shelf == filterType);
    this.filteredArray = [...newArr];
  }
  
  booksFilter(filterType:string){
    this.filterType = filterType;
    switch(filterType){
      case "all":
        this.filteredArray = [...this.userBooks];
        break;
      case "read":
        this.filterByShelf(filterType);
        break;
      case "want to read":
        this.filterByShelf(filterType);
        break;
      case "currently reading":
        this.filterByShelf(filterType);
        break;
      default:
        break;
    }
  }
  
  onUpdateList(event:any){
    let newArr = [];
    console.log(event);
    newArr = this.userBooks.map(bookObj => {
        if(bookObj.book._id == event.id){
          return {shelf: event.shelf, book: {...bookObj.book}};
        }
        return bookObj;
    });
    
    this.userBooks = newArr;
    if(this.filterType != "all")
      this.filterByShelf(this.filterType);
    else
      this.filteredArray = [...this.userBooks];
    console.log(this.filteredArray);
    console.log(this.filterType);
  }

}

import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserBooksService } from '../../../../Services/userBooks.service';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent implements OnInit {

  constructor(private modalService: NgbModal, private userBooksService: UserBooksService) { }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
  
  selectedValue:string = "read";
  subscriber:any;
  selectedBookId:string = "";
  isLoading:boolean = false;

  open(content:any, event:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.selectedBookId = event.target.dataset.id;
  }
  
  setSelectedValue(event:any){
    this.selectedValue = event.target.value;
  }

  @Input() booksArr:Array<any> = [];
  
  @Output() updateList = new EventEmitter();

  handleShelfUpdate(){
    const body = {
      bookId: this.selectedBookId,
      shelf: this.selectedValue
    };
    this.isLoading = true;
    //let newArr = [];
    this.subscriber = this.userBooksService.updateUserShelf(body)
    .subscribe((response:any)=>{
      console.log(response);
      this.updateList.emit({shelf: this.selectedValue, id: this.selectedBookId});
      /*newArr = this.booksArr.map(bookObj => {
        if(bookObj.book._id == this.selectedBookId){
          return {shelf: this.selectedValue, book: {...bookObj.book}};
        }
        return bookObj;
      });*/
      this.isLoading = false;
      //this.booksArr = [...newArr];
      this.selectedValue = "read";
      this.selectedBookId = "";
      this.modalService.dismissAll();
    },
    (err)=>{
      console.log(err)
    }
    )
  }

}

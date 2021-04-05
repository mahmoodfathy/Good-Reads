import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/Services/book.service';

export interface Book {
  _id: String;
  name: string;
  author: { firstname: string; lastname: string };
  cover: string;
  category: { category: string };
  description?: string;
}
export interface BookSchema {
  name: string;
  category: string;
  description: string;
  cover: string;
  // author: string;
}

@Component({
  selector: 'app-booktable',
  templateUrl: './booktable.component.html',
  styleUrls: ['./booktable.component.css'],
})
export class BooktableComponent implements OnInit, OnDestroy {
  constructor(private myService: BookService, private modalService: NgbModal) {}
  filter = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    // author: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    bookImage: new FormControl('', [Validators.required]),
  });
  subscriber: Subscription;
  books: Book[];
  testBooks: BookSchema[];
  closeResult = '';
  name = '';
  category = '';
  author = '';
  description = '';
  bookImage = '';
  id = '';
  itemIndex: number;
  editMode: Boolean = false;
  newMode: Boolean = false;
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriber = this.myService.getBooks().subscribe((res: any) => {
      console.log(res);
      this.books = res.body;
      this.testBooks = res.body;
      console.log(this.testBooks);
    });
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          console.log(result);
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  handleNewBookRender(content: any) {
    this.newMode = true;
    this.editMode = false;
    this.open(content);
  }
  addNewBook() {
    this.name = this.filter.value.name;
    this.category = this.filter.value.category;
    this.description = this.filter.value.description;
    this.bookImage = this.filter.value.bookImage;
    this.author = this.filter.value.author;

    this.subscriber = this.myService
      .addBook({
        name: this.name,
        description: this.description,
        // author: this.author,
        category: this.category,
        cover: this.bookImage,
      })
      .subscribe((res: any) => {
        console.log(res);
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }
  handleEditRender(e: any, content: any) {
    this.newMode = false;
    this.editMode = true;
    this.open(content);
    this.id = e.target.id;
    this.itemIndex = e.target.dataset.index;
  }
  handleEdit(e: any) {
    //@TODO Handle the empty string bug, if the user wants to empty the field he should be able to !!
    const name = this.testBooks[this.itemIndex].name;
    const description = this.testBooks[this.itemIndex].description;
    // const author = this.testBooks[this.itemIndex].author;
    const category = this.testBooks[this.itemIndex].category;
    const cover = this.testBooks[this.itemIndex].cover;

    this.subscriber = this.myService
      .editBook(this.id, {
        name: this.name === '' ? name : this.name,
        description: this.description === '' ? description : this.description,
        category: this.category === '' ? category : this.category,
        cover: this.bookImage === '' ? cover : this.bookImage,
      })
      .subscribe((res: any) => {
        console.log(res);
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }
  handleDelete(e: any) {
    console.log(e.target.id);
    this.subscriber = this.myService
      .deleteBook(e.target.id)
      .subscribe((res: any) => {
        console.log(res);
        this.ngOnInit();
      });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthorService } from 'src/app/Services/author.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export interface Author {
  firstname: string;
  lastname: string;
  dob: string;
  shortdescription: string;
  books?: string[];
  imageURL: string;
  _id?: string;
}
@Component({
  selector: 'app-authortable',
  templateUrl: './authortable.component.html',
  styleUrls: ['./authortable.component.css'],
})
export class AuthortableComponent implements OnInit, OnDestroy {
  constructor(
    private myService: AuthorService,
    private modalService: NgbModal
  ) {}
  subscirber: Subscription;
  authors: Author[];
  firstName = '';
  lastName = '';
  shortDescription = '';
  imageUrl = '';
  dob = '';
  closeResult = '';
  newMode: Boolean;
  editMode: Boolean;
  id = '';
  itemIndex: number;

  filter = new FormGroup({
    Firstname: new FormControl('', [Validators.required]),
    Lastname: new FormControl('', [Validators.required]),
    shortDescription: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
  });

  ngOnDestroy() {
    this.subscirber.unsubscribe();
  }

  ngOnInit(): void {
    this.subscirber = this.myService.getAuthors().subscribe((res: any) => {
      console.log(res);
      this.authors = res;
    });
  }
  handleEdit(e: any) {
    //@TODO handle empty string edit
    const firstname = this.authors[this.itemIndex].firstname;
    const lastname = this.authors[this.itemIndex].lastname;
    const shortDescription = this.authors[this.itemIndex].shortdescription;
    const dob = this.authors[this.itemIndex].dob;
    const imageURL = this.authors[this.itemIndex].imageURL;
    this.subscirber = this.myService
      .editAuthor(this.id, {
        firstname: this.firstName === '' ? firstname : this.firstName,
        lastname: this.lastName === '' ? lastname : this.lastName,
        shortdescription:
          this.shortDescription === ''
            ? shortDescription
            : this.shortDescription,
        dob: this.dob === '' ? dob : this.dob,
        imageURL: this.imageUrl === '' ? imageURL : this.imageUrl,
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
    this.id = (e.target as HTMLInputElement).id;
    this.itemIndex = e.target.dataset.index;
  }
  addNewAuthor() {
    this.subscirber = this.myService
      .addAuthor({
        firstname: this.firstName,
        lastname: this.lastName,
        shortdescription: this.shortDescription,
        dob: this.dob,
        imageURL: this.imageUrl,
      })
      .subscribe((res: any) => {
        console.log(res);
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }
  handleDelete(e: MouseEvent) {
    this.id = (e.target as HTMLInputElement).id;
    this.subscirber = this.myService
      .deleteAuthor(this.id)
      .subscribe((res: any) => {
        console.log(res);
        this.ngOnInit();
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  handleNewAuthorRender(content: any) {
    this.newMode = true;
    this.editMode = false;
    this.open(content);
  }
}

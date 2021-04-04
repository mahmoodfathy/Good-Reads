import {
  Component,
  OnInit,
  PipeTransform,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoryService } from 'src/app/Services/category.service';
import { Subscription } from 'rxjs';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

export interface Category {
  category: string;
  _id: any;
}
@Component({
  selector: 'app-categorytable',
  templateUrl: './categorytable.component.html',
  styleUrls: ['./categorytable.component.css'],
  providers: [DecimalPipe],
})
export class CategorytableComponent implements OnInit, OnDestroy {
  constructor(
    pipe: DecimalPipe,
    private myService: CategoryService,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef
  ) {
    this.categories$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe))
    );
  }
  closeResult = '';
  categories: Category[] = [];
  categories$: Observable<Category[]>;
  filter = new FormControl('');
  categoryName = new FormControl('', [Validators.required]);
  subscriber: Subscription;
  category = '';
  id = '';
  editMode: Boolean = false;
  newMode: Boolean = false;
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
  ngOnInit(): void {
    console.log('mounted');
    this.subscriber = this.myService
      .getCategories()
      .subscribe((response: any) => {
        // console.log(response);
        // console.log(this.subscriber);
        this.categories = response.body;
        this.cdRef.detectChanges();
      });
    // this.getId();
  }
  handleDelete(e: any) {
    console.log(e.target.id);
    this.subscriber = this.myService
      .deleteCategory(e.target.id)
      .subscribe((response: any) => {
        console.log(response.message);
        this.ngOnInit();
      });
  }
  search(text: string, pipe: PipeTransform): Category[] {
    return this.categories.filter((category) => {
      const term = text.toLowerCase();
      return category.category.toLowerCase().includes(term);
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
  handleEditRender(e: any, content: any) {
    this.newMode = false;
    this.editMode = true;
    this.open(content);
    this.id = e.target.id;
  }
  handleNewRender(content: any) {
    this.newMode = true;
    this.editMode = false;
    this.open(content);
  }
  handleEdit(e: any) {
    // this.newMode = false;
    // this.editMode = true;
    this.category = this.categoryName.value;
    // console.log(this.category);
    this.subscriber = this.myService
      .editCategroy(this.id, this.category)
      .subscribe((res: any) => {
        console.log(res.message);
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }
  recieve() {
    // console.log(this.categoryName.value);
    this.editMode = false;
    this.newMode = true;
    this.category = this.categoryName.value;
    this.subscriber = this.myService
      .addCategory(this.category)
      .subscribe((response: any) => {
        console.log(response.data);
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }

  ngOnChanges() {
    // this.ngOnInit();
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

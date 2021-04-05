import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from "../../../../Services/categories.service";
import {Category} from '../../../../models/category'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-all-categories',
  templateUrl: './list-all-categories.component.html',
  styleUrls: ['./list-all-categories.component.css']
})
export class ListAllCategoriesComponent implements OnInit,OnDestroy {
  constructor(private listCategories:CategoriesService) { }
  Categories:Array<Category>;
  subscriber:Subscription;
  ngOnInit(): void {
    this.subscriber=this.listCategories.getAllCategories()
      .subscribe((res:any)=>{
          console.log(res);
          this.Categories =res.body;
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

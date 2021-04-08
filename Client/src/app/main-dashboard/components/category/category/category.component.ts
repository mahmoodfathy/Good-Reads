import { Component, OnInit,Input } from '@angular/core';
import {Category} from '../../../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  @Input('categoryCard') category:Category;

}

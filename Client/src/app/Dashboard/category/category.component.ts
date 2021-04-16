import { Component, OnInit, ViewChild } from '@angular/core';
import { BooktableComponent } from '../booktable/booktable.component';
@ViewChild(BooktableComponent)
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class AdminCategoryComponent implements OnInit {
  constructor() {}
  active = 1;
  ngOnInit(): void {}
}
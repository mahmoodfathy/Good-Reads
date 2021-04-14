import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategorytableComponent } from '../categorytable/categorytable.component';
import { AdminCategoryComponent } from '../category/category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/Services/category.service';
import { BookService } from 'src/app/Services/book.service';
import { BooktableComponent } from '../booktable/booktable.component';
import { AuthortableComponent } from '../authortable/authortable.component';
import { AuthorService } from 'src/app/Services/author.service';

@NgModule({
  declarations: [
    BooktableComponent,
    AdminCategoryComponent,
    CategorytableComponent,
    AuthortableComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CategoryService, BookService, AuthorService],
  exports: [
    BooktableComponent,
    AdminCategoryComponent,
    CategorytableComponent,
    AuthortableComponent,
  ],
})
export class DashboardModule {}

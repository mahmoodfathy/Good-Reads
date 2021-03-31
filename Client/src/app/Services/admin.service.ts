import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private bookClient:HttpClient) {}
  readonly baseURL:string="http://localhost:5000/admin";

  addNewBook(){

  }
  addNewAuthor(){
  }
  addNewCategory(){
  }
  editBook(){
  }
  editAuthor(){
  }
  editCategory(){

  }
  deleteBook(){

  }
  deleteAuthor(){

  }
  deleteCategory(){

  }


}

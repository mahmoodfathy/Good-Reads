import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookSchema } from '../Dashboard/booktable/booktable.component';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private client: HttpClient) {}
  PORT = 5000;
  token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA1NTBlMjhlY2NmOTRlYTFjY2M4MTk1IiwiaXNBZG1pbiI6ZmFsc2V9LCJpYXQiOjE2MTc3ODk2OTIsImV4cCI6MTYxNzgyNTY5Mn0.-YRW4khzjzbAUSpq1_hHS_Vs97lN9Ohj4kAS9rXZR44";
  headers:any = {"x-auth-token": this.token}
  readonly baseUrl = `http://localhost:${this.PORT}/book`;
  getBooks() {
    return this.client.get(this.baseUrl, { observe: 'response' });
  }
  
  getBookById(id:string){
    let url:string = this.baseUrl + `/${id}`;
    return this.client.get(url);
  }

  addReviewToBook(id:string, body:any){
    let url:string = this.baseUrl + `/${id}`;
    return this.client.put(url, body, {headers: this.headers});
  }

  addRatingToBook(id:string, rating:number, body:any){
    let url:string = this.baseUrl + `/${id}/${rating}`;
    return this.client.put(url, body, {headers: this.headers});
  }

  addBook(book: BookSchema) {
    console.log(book.name);
    return this.client.post(this.baseUrl, {
      name: book.name,
      category: book.category,
      description: book.description,
      cover: book.cover,
    }, {headers: this.headers});
  }
  deleteBook(id: string) {
    return this.client.delete(`${this.baseUrl}/${id}`, {headers: this.headers});
  }
  editBook(id: string, book: BookSchema) {
    return this.client.patch(`${this.baseUrl}/${id}`, {
      name: book.name,
      category: book.category,
      description: book.description,
      cover: book.cover,
    }, {headers: this.headers});
  }
}

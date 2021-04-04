import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookSchema } from '../Dashboard/booktable/booktable.component';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private client: HttpClient) {}
  PORT = 5000;
  token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA1ZTE3NDAyZjljZTVhMzE0YjNhMzc4IiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYxNzU2MjY3MSwiZXhwIjoxNjE3NTk4NjcxfQ.EfzSbYWccbD8FcZNJjDj8gxNEOU9bPJPY06ZLoy-his";
  headers:any = {"x-auth-token": this.token}
  readonly baseUrl = `http://localhost:${this.PORT}/book`;
  getBooks() {
    return this.client.get(this.baseUrl, { observe: 'response' });
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

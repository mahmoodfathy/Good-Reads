import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookSchema } from '../Dashboard/booktable/booktable.component';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private client: HttpClient) {}
  PORT = 3001;
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
    });
  }
  deleteBook(id: string) {
    return this.client.delete(`${this.baseUrl}/${id}`);
  }
  editBook(id: string, book: BookSchema) {
    return this.client.patch(`${this.baseUrl}/${id}`, {
      name: book.name,
      category: book.category,
      description: book.description,
      cover: book.cover,
    });
  }
}

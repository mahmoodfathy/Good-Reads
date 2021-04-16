import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getToken } from '../auth/services/custom-validation.service';
import { BookSchema } from '../Dashboard/booktable/booktable.component';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private client: HttpClient) {}
  PORT = 5000;
  token = '';
  readonly baseUrl = `https://good-reads-iti.herokuapp.com/book`;
  headers: any = { 'x-auth-token': '' };

  getBooks() {
    return this.client.get(this.baseUrl, { observe: 'response' });
  }

  getBookById(id: string) {
    let url: string = this.baseUrl + `/${id}`;
    return this.client.get(url);
  }

  addReviewToBook(id: string, body: any) {
    let url: string = this.baseUrl + `/${id}`;
    this.token = getToken();
    this.headers = { 'x-auth-token': this.token };

    return this.client.put(url, body, { headers: this.headers });
  }

  addRatingToBook(id: string, rating: number, body: any) {
    let url: string = this.baseUrl + `/${id}/${rating}`;
    this.token = getToken();
    this.headers = { 'x-auth-token': this.token };

    return this.client.put(url, body, { headers: this.headers });
  }

  addBook(book: BookSchema) {
    this.token = getToken();
    this.headers = { 'x-auth-token': this.token };

    return this.client.post(
      this.baseUrl,
      {
        name: book.name,
        category: book.category,
        description: book.description,
        cover: book.cover,
        author: book.author,
      },
      { headers: this.headers }
    );
  }
  deleteBook(id: string) {
    this.token = getToken();
    this.headers = { 'x-auth-token': this.token };

    return this.client.delete(`${this.baseUrl}/${id}`, {
      headers: this.headers,
    });
  }
  editBook(id: string, book: BookSchema) {
    this.token = getToken();
    this.headers = { 'x-auth-token': this.token };

    return this.client.patch(
      `${this.baseUrl}/${id}`,
      {
        name: book.name,
        category: book.category,
        description: book.description,
        cover: book.cover,
        author: book.author,
      },
      { headers: this.headers }
    );
  }
}

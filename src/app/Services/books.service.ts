import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private bookClient: HttpClient) {}
  readonly baseURL: string = 'https://good-reads-iti.herokuapp.com/book';
  readonly popularURL: string =
    'https://good-reads-iti.herokuapp.com/book/books/top';

  getAllBooks() {
    const res = this.bookClient.get(this.baseURL, { observe: 'response' });
    return res;
  }
  getPopularBooks() {
    return this.bookClient.get(this.popularURL, { observe: 'response' });
  }
  getBookById(id: number) {
    return this.bookClient.get(`${this.baseURL}/${id}`, {
      observe: 'response',
    });
  }
}
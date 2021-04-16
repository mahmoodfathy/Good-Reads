import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private authorClient: HttpClient) {}
  readonly baseURL: string = 'https://good-reads-iti.herokuapp.com/author';
  readonly popularURL: string =
    'https://good-reads-iti.herokuapp.com/author/authors/top';
  readonly bookURL: string = 'https://good-reads-iti.herokuapp.com/book/author';

  getAllAuthors() {
    const res = this.authorClient.get(this.baseURL, { observe: 'response' });
    return res;
  }
  getPopularAuthors() {
    return this.authorClient.get(this.popularURL, { observe: 'response' });
  }
  getAuthorById(id: number) {
    return this.authorClient.get(`${this.baseURL}/${id}`, {
      observe: 'response',
    });
  }
  getAuthorBooks(id: string) {
    return this.authorClient.get(`${this.bookURL}/${id}`, {
      observe: 'response',
    });
  }
}

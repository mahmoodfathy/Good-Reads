import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getToken } from '../auth/services/custom-validation.service';
import { Author } from '../Dashboard/authortable/authortable.component';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private client: HttpClient) {}
  PORT = 5000;
  token = '';
  headers: any = { 'x-auth-token': '' };
  readonly baseUrl = `http://localhost:${this.PORT}/author`;
  getAuthors() {
    return this.client.get(this.baseUrl);
  }
  addAuthor(author: Author) {
    this.token = getToken();
    this.headers = { 'x-auth-token': this.token };

    return this.client.post(
      this.baseUrl,
      {
        firstname: author.firstname,
        lastname: author.lastname,
        shortdescription: author.shortdescription,
        imageURL: author.imageURL,
        dob: author.dob,
      },
      { headers: this.headers }
    );
  }
  deleteAuthor(id: string) {
    this.token = getToken();
    this.headers = { 'x-auth-token': this.token };

    return this.client.delete(`${this.baseUrl}/${id}`, {
      headers: this.headers,
    });
  }
  editAuthor(id: string, author: Author) {
    this.token = getToken();
    this.headers = { 'x-auth-token': this.token };

    return this.client.patch(
      `${this.baseUrl}/${id}`,
      {
        firstname: author.firstname,
        lastname: author.lastname,
        shortdescription: author.shortdescription,
        imageURL: author.imageURL,
        dob: author.dob,
      },
      { headers: this.headers }
    );
  }
}

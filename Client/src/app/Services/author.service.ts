import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../Dashboard/authortable/authortable.component';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private client: HttpClient) {}
  PORT = 3001;
  readonly baseUrl = `http://localhost:${this.PORT}/author`;
  getAuthors() {
    return this.client.get(this.baseUrl);
  }
  addAuthor(author: Author) {
    console.log(
      author.firstname,
      author.lastname,
      author.shortdescription,
      author.dob,
      author.imageURL
    );
    return this.client.post(this.baseUrl, {
      firstname: author.firstname,
      lastname: author.lastname,
      shortdescription: author.shortdescription,
      imageURL: author.imageURL,
      dob: author.dob,
    });
  }
  deleteAuthor(id: string) {
    return this.client.delete(`${this.baseUrl}/${id}`);
  }
  editAuthor(id: string, author: Author) {
    return this.client.patch(`${this.baseUrl}/${id}`, {
      firstname: author.firstname,
      lastname: author.lastname,
      shortdescription: author.shortdescription,
      imageURL: author.imageURL,
      dob: author.dob,
    });
  }
}

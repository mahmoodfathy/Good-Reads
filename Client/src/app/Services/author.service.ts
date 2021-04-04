import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../Dashboard/authortable/authortable.component';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private client: HttpClient) {}
  PORT = 5000;
  token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA1ZTE3NDAyZjljZTVhMzE0YjNhMzc4IiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYxNzU2MjY3MSwiZXhwIjoxNjE3NTk4NjcxfQ.EfzSbYWccbD8FcZNJjDj8gxNEOU9bPJPY06ZLoy-his";
  headers:any = {"x-auth-token": this.token}
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
    }, {headers: this.headers});
  }
  deleteAuthor(id: string) {
    return this.client.delete(`${this.baseUrl}/${id}`, {headers: this.headers});
  }
  editAuthor(id: string, author: Author) {
    return this.client.patch(`${this.baseUrl}/${id}`, {
      firstname: author.firstname,
      lastname: author.lastname,
      shortdescription: author.shortdescription,
      imageURL: author.imageURL,
      dob: author.dob,
    }, {headers: this.headers});
  }
}

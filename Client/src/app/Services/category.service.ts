import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private client: HttpClient) {}
  PORT = 5000;
  token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA1ZTE3NDAyZjljZTVhMzE0YjNhMzc4IiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYxNzU2MjY3MSwiZXhwIjoxNjE3NTk4NjcxfQ.EfzSbYWccbD8FcZNJjDj8gxNEOU9bPJPY06ZLoy-his";
  headers:any = {"x-auth-token": this.token}
  readonly baseUrl = `http://localhost:${this.PORT}/category`;
  addCategory(category: string) {
    return this.client.post(this.baseUrl, { category }, {headers: this.headers});
  }
  getCategories() {
    return this.client.get(this.baseUrl, {headers: this.headers});
  }
  deleteCategory(id: string) {
    return this.client.delete(`${this.baseUrl}/${id}`, {headers: this.headers});
  }
  editCategroy(id: string, category: string) {
    // console.log(category);
    return this.client.patch(`${this.baseUrl}/${id}`, {
      categoryName: category,
    }, {headers: this.headers});
  }
}

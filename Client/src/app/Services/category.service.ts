import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private client: HttpClient) {}
  PORT = 3001;
  readonly baseUrl = `http://localhost:${this.PORT}/category`;
  addCategory(category: string) {
    return this.client.post(this.baseUrl, { category });
  }
  getCategories() {
    return this.client.get(this.baseUrl, { observe: 'response' });
  }
  deleteCategory(id: string) {
    return this.client.delete(`${this.baseUrl}/${id}`);
  }
  editCategroy(id: string, category: string) {
    // console.log(category);
    return this.client.patch(`${this.baseUrl}/${id}`, {
      categoryName: category,
    });
  }
}

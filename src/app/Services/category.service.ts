import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getToken } from '../auth/services/custom-validation.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private client: HttpClient) {}
  PORT = 5000;
  token: string = '';
  headers: any = { 'x-auth-token': '' };
  readonly baseUrl = `https://good-reads-iti.herokuapp.com/category`;
  addCategory(category: string) {
    this.token = getToken();
    this.headers = { 'x-auth-token': this.token };
    return this.client.post(
      this.baseUrl,
      { category },
      { headers: this.headers }
    );
  }
  getCategories() {
    this.token = getToken();
    this.headers = { 'x-auth-token': this.token };

    return this.client.get(this.baseUrl, { headers: this.headers });
  }
  deleteCategory(id: string) {
    this.token = getToken();
    this.headers = { 'x-auth-token': this.token };
    return this.client.delete(`${this.baseUrl}/${id}`, {
      headers: this.headers,
    });
  }
  editCategroy(id: string, category: string) {
    this.token = getToken();
    this.headers = { 'x-auth-token': this.token };

    return this.client.patch(
      `${this.baseUrl}/${id}`,
      {
        categoryName: category,
      },
      { headers: this.headers }
    );
  }
}

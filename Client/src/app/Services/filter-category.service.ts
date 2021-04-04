import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterCategoryService {
  constructor(private client: HttpClient) {}
  PORT = 3001;
  readonly baseURL = `http://localhost:${this.PORT}/book/category`;
  getCategoryBooks(id: string) {
    return this.client.get(`${this.baseURL}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private authorClient: HttpClient) {}
  readonly baseURL: string = 'https://good-reads-iti.herokuapp.com/category';
  readonly popularURL: string =
    'https://good-reads-iti.herokuapp.com/category/top';

  getAllCategories() {
    const res = this.authorClient.get(this.baseURL, { observe: 'response' });
    return res;
  }
  getPopularCategories() {
    return this.authorClient.get(this.popularURL, { observe: 'response' });
  }
  getCategoryById(id: number) {
    return this.authorClient.get(`${this.baseURL}/${id}`, {
      observe: 'response',
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CustomValidationService,
  decodeToken,
  getToken,
} from '../auth/services/custom-validation.service';

@Injectable({
  providedIn: 'root',
})
export class UserBooksService {
  constructor(
    private client: HttpClient,
    private myService: CustomValidationService
  ) {}

  port: number = 5000;

  getUserBooks() {
    const userId = decodeToken().id;

    const baseUrl = `http://localhost:${this.port}/user/${userId}/books`;

    const token = getToken();
    const headers = { 'x-auth-token': token };
    return this.client.get(baseUrl, { headers: headers });
  }

  addBookToUser(body: { bookId: string; shelf: string }) {
    const userId = decodeToken().id;

    const baseUrl = `http://localhost:${this.port}/user/${userId}/books`;

    const token = getToken();
    const headers = { 'x-auth-token': token };
    return this.client.post(baseUrl, body, { headers: headers });
  }

  updateUserShelf(body: { bookId: string; shelf: string }) {
    const userId = decodeToken().id;

    const baseUrl = `http://localhost:${this.port}/user/${userId}/books`;

    const token = getToken();
    const headers = { 'x-auth-token': token };
    return this.client.put(baseUrl, body, { headers: headers });
  }
}

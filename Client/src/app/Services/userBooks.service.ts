import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserBooksService {

  constructor(private client:HttpClient) { }
  
  token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA1NTBlMjhlY2NmOTRlYTFjY2M4MTk1IiwiaXNBZG1pbiI6ZmFsc2V9LCJpYXQiOjE2MTc3ODk2OTIsImV4cCI6MTYxNzgyNTY5Mn0.-YRW4khzjzbAUSpq1_hHS_Vs97lN9Ohj4kAS9rXZR44";

  port:number = 5000
  baseUrl:string = `http://localhost:${this.port}/user/60550e28eccf94ea1ccc8195/books`;
  
  headers:any = {"x-auth-token": this.token}
  
  getUserBooks(){
    return this.client.get(this.baseUrl, {headers: this.headers});
  }

  addBookToUser(body:{bookId: string, shelf:string}){
    return this.client.post(this.baseUrl, body, {headers: this.headers});
  }

  updateUserShelf(body:{bookId: string, shelf:string}){
    return this.client.put(this.baseUrl, body, {headers: this.headers});
  }
}

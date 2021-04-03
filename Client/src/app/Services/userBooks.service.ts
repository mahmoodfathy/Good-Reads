import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserBooksService {

  constructor(private client:HttpClient) { }
  
  token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA1NTBlMjhlY2NmOTRlYTFjY2M4MTk1IiwiaXNBZG1pbiI6ZmFsc2V9LCJpYXQiOjE2MTc0MzQ5NjMsImV4cCI6MTYxNzQ3MDk2M30.saP4ElMezkw73Li134gUehl8t06JSuoZcE7DbugmfiE";

  baseUrl:string = "http://localhost:5000/user/60550e28eccf94ea1ccc8195/books";
  
  headers:any = {"x-auth-token": this.token}
  
  getUserBooks(){
    return this.client.get(this.baseUrl, {headers: this.headers});
  }

  updateUserShelf(body:{bookId: string, shelf:string}){
    return this.client.put(this.baseUrl, body, {headers: this.headers});
  }
}

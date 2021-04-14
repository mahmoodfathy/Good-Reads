import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../IUser'
import { IUserlogin } from '../IUserlogin'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
     providedIn: 'root'
})
export class CustomValidationService {
     readonly baseURL: string = "http://localhost:5000/user"
     //"mongodb+srv://esraa:123456789Esraa@cluster0.0attd.mongodb.net/Good-Reads?retryWrites=true&w=majority";
     isLoggedIn: boolean = false;
     currentUser: IUser = {
          username: '',
          email: ''

     };
     currentUserlogin: IUserlogin = {
          email: ''

     };
     constructor(private http: HttpClient) { }

     register(model: any) {

          return this.http.post(this.baseURL + '/signup', model).pipe(
               map((response: any) => {
                    this.isLoggedIn = true;
                    this.currentUser.username = response.username;
                    this.currentUser.email = response.email;
                    localStorage.setItem('token', response.token)
                    //console.log((JSON.parse(atob((response.token).split('.')[1]))).exp)
               })
          );

     }
     login(model: any) {

          return this.http.post(this.baseURL + '/login', model).pipe(
               map((response: any) => {
                    this.isLoggedIn = true;
                    this.currentUserlogin.email = response.email;
                    localStorage.setItem('token', response.token)

               })
          );

     }
     //   getdata(){
     //      console.log(this.http.get("http://localhost:5000/user/"));
     //   }
     private tokenExpired(token: string) {
          const expiry = JSON.parse(atob(token.split('.')[1])).exp;
          return Math.floor(new Date().getTime() / 1000) >= expiry;
     }
     private loggedIn = new BehaviorSubject<boolean>(false);
     isAuth() {
          
          let token = localStorage.getItem('token') as string;
          if (!token || this.tokenExpired(token)) {
               //  this.isLoggedIn = false;
               this.loggedIn.next(false);

               return this.loggedIn.asObservable();
          }
          this.loggedIn.next(true);
          return this.loggedIn.asObservable();
     }
     get isAuthenticated() {
          return this.isAuth(); // {2}
     }

     logout() {
          localStorage.removeItem('token');
          this.isLoggedIn = false;
     }
}

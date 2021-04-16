import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../IUser';
import { IUserlogin } from '../IUserlogin';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
export function getToken() {
  return localStorage.getItem('token');
}
export function decodeToken() {
  const token = getToken();
  let user;
  if (token) {
    user = JSON.parse(atob(token.split('.')[1])).user;
    return user;
  }
  return { id: '', isAdmin: false };
}
@Injectable({
  providedIn: 'root',
})
export class CustomValidationService implements CanActivate {
  readonly baseURL: string = 'http://localhost:5000/user';
  isLoggedIn: boolean = false;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<IUser>({});
  private userInfo: IUser;
  currentUser: IUser = {
    username: '',
    email: '',
  };
  currentUserlogin: IUserlogin = {
    email: '',
  };
  constructor(private http: HttpClient, private router: Router) {}
  canActivate(): boolean {
    if (!this.isAuth()) {
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
  register(model: any) {
    return this.http.post(this.baseURL + '/signup', model).pipe(
      map((response: any) => {
        this.isLoggedIn = true;
        this.loggedIn.next(true);
        this.currentUser.username = response.username;
        this.currentUser.email = response.email;
        this.setUserInfo(response);

        console.log(this.currentUser);

        localStorage.setItem('token', response.token);
        //console.log((JSON.parse(atob((response.token).split('.')[1]))).exp)
      })
    );
  }
  login(model: any) {
    return this.http.post(this.baseURL + '/login', model).pipe(
      map((response: any) => {
        this.isLoggedIn = true;
        this.loggedIn.next(true);
        this.currentUserlogin.email = response.email;
        this.setUserInfo(response);
        console.log(this.user);

        localStorage.setItem('token', response.token);
      })
    );
  }

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
  getUser(token: string) {
    let url = 'http://localhost:5000/user/logged';
    return this.http.get(url, { headers: { 'x-auth-token': token } });
  }
  isAuth$() {
    let token = localStorage.getItem('token') as string;

    if (!token || this.tokenExpired(token)) {
      //  this.isLoggedIn = false;
      this.loggedIn.next(false);

      return this.loggedIn.asObservable();
    }
    this.loggedIn.next(true);

    return this.loggedIn.asObservable();
  }
  isAuth() {
    let token = localStorage.getItem('token') as string;

    if (!token || this.tokenExpired(token)) {
      this.isLoggedIn = false;

      return this.isLoggedIn;
    }
    this.isLoggedIn = true;

    return this.isLoggedIn;
  }
  get isAuthenticated() {
    return this.isAuth$(); // {2}
  }
  getUserInfo() {
    return this.user.asObservable();
  }
  setUserInfo(user: IUser) {
    this.user.next(user);
  }

  logout() {
    localStorage.removeItem('token');
    this.user.next({});
    this.isLoggedIn = false;
    this.loggedIn.next(false);
  }
}

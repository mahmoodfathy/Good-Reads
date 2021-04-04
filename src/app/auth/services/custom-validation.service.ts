import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../IUser'
import {IUserlogin} from '../IUserlogin'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {
  readonly baseURL: string = "http://localhost:5000/user"
  //"mongodb+srv://esraa:123456789Esraa@cluster0.0attd.mongodb.net/Good-Reads?retryWrites=true&w=majority";
  isLoggedIn:boolean=false;

  currentUser:IUser={
       username:'',
       email:'',
       password:''
  };
  currentUserlogin:IUserlogin={
     email:'',
     password:''
};
  constructor(private http:HttpClient){}
  
  register(model:any):Observable<IUser>{
    
       return this.http.post(this.baseURL+'/signup',model).pipe(
            map((response:any)=>{
                this.isLoggedIn=true;
                this.currentUser.username=response.username;
                this.currentUser.email=response.email;
                this.currentUser.password=response.password;
                localStorage.setItem('token',response.token)
                return this.currentUser;
            })
       );
      
  }
  login(model:any):Observable<IUserlogin>{
    
     return this.http.post(this.baseURL+'/login',model).pipe(
          map((response:any)=>{
              this.isLoggedIn=true;
              this.currentUserlogin.email=response.email;
              this.currentUserlogin.password=response.password;
              localStorage.setItem('token',response.token)
              return this.currentUserlogin;
          })
     );
    
}
  getdata(){
     console.log(this.http.get("http://localhost:5000/user/"));
  }
  logout(){
       this.isLoggedIn=false;
  }
}

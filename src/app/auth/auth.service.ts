import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http';
import {IUser} from './IUser'
import {IUserlogin} from './IUserlogin'
import { Observable } from 'rxjs';
import   {map}  from "rxjs/operators";

@Injectable({
     providedIn:'root',
})
export class authService{
     readonly baseURL: string = "mongodb+srv://esraa:123456789Esraa@cluster0.0attd.mongodb.net/Good-Reads?retryWrites=true&w=majority";
     isLoggedIn:boolean=false;
   
     currentUser:IUser={
          username:'',
          email:'',
          password:''
     };
     // currentUserlogin:IUserlogin={
     //      username:'',
     //      password:''
     // };
     constructor(private http:HttpClient){}
     register(model:any):Observable<IUser>{
          return this.http.post(this.baseURL+'/user',model).pipe(
               map((response:any)=>{
                   this.isLoggedIn=true;
                   this.currentUser.username=response.username;
                   this.currentUser.email=response.email;
                   this.currentUser.password=response.password;

                   return this.currentUser;
               })
          );
     }
     logout(){
          this.isLoggedIn=false;
     }
}
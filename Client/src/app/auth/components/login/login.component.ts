import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  Validators, FormBuilder, FormControl ,FormGroup} from '@angular/forms';
import {CustomValidationService} from '../../services/custom-validation.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
//email validator//note
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  password = new FormControl('', [Validators.required,Validators.minLength(8)]);
  isLoading:boolean=false;
  LoginErr:boolean=false;
  userForm: FormGroup = this.builder.group({
    email: this.email,
    password: this.password
  });
   
  constructor(private builder: FormBuilder,private authServices:CustomValidationService,private _router:Router) { }
   ngOnInit(){
   }
  onSubmit(){
    this.isLoading=true;
    this.authServices.login(this.userForm.value).subscribe(
      res=>{ console.log(res)
        this.isLoading=false;
        this.LoginErr=false;
          this._router.navigate(['/'])
      },
      err=>{
        this.LoginErr=true;
        this.isLoading=false;
        console.log(err)}
      
    )}

}

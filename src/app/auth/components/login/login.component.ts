import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {CustomValidationService} from '../services/custom-validation.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
//email validator//note
export class LoginComponent implements OnInit {
  userForm=this.fb.group({
    username:["",[Validators.required,Validators.minLength(3)]],
    password:["",[Validators.required,Validators.minLength(8)]]
  })
    
  constructor(private fb:FormBuilder,
    private customValid:CustomValidationService) {}
  
   ngOnInit(){

   }
   sendDataLogin(){

   }
   getData(){

   }
  onSubmit(){
    if (this.userForm.invalid) {
      console.log("invalid");
      return;
  }
    console.log(this.userForm.value);
  }

}

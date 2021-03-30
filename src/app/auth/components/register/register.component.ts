import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {CustomValidationService} from '../services/custom-validation.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userForm=this.fb.group({
    username:["",[Validators.required,Validators.minLength(3)]],
    email: ["", [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password:["",[Validators.required,Validators.minLength(8)]]
  })
    
  constructor(private fb:FormBuilder,
    private customValid:CustomValidationService) {}
  
   ngOnInit(){

   }
   sendDataRegistration(){

   }
   getData(){

   }
   
  onSubmit(){
    if (this.userForm.invalid) {
    
      console.log("invalid");
      console.log(this.userForm.status);
      return;
  }
    console.log(this.userForm.value);
  }



}


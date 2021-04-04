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

  userForm: FormGroup = this.builder.group({
    email: this.email,
    password: this.password
  });

  constructor(private builder: FormBuilder,private authServices:CustomValidationService,private _router:Router) { }
   ngOnInit(){
   }
   sendDataLogin(){

   }
   getData(){
  
   }
  onSubmit(){
    if (this.userForm.invalid) {
    
      console.log("invalid");
      console.log(this.userForm.status);
      return;
  }
    // const succ={
    //     //  next:(x:any)=>{
    //     //    this.alertService.success("welcom")
    //     //  },error:(err:any)=>{
    //     //    this.alertService.danger('unble to register')
    //     //  }
    //     console.log("succccc")
         
    // }
    this.authServices.getdata();
    this.authServices.login(this.userForm.value).subscribe(
      res=>{ console.log(res)
          this._router.navigate(['/'])
      },
      err=>console.log

    );
    console.log(this.userForm.value);
  }

}

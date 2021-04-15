import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidationService } from '../../services/custom-validation.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  userForm: FormGroup = this.builder.group({
    username: this.username,
    email: this.email,
    password: this.password,
  });
  isLoading: boolean = false;
  LoginErr: boolean = false;
  constructor(
    private builder: FormBuilder,
    private authServices: CustomValidationService,
    private _router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this._router.navigate(['/']);
    }
  }
  onSubmit() {
    this.isLoading = true;
    this.authServices.register(this.userForm.value).subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.LoginErr = false;
        this._router.navigate(['/home']);
      },
      (err) => {
        this.LoginErr = true;
        this.isLoading = false;
        console.log(err);
      }
    );
  }
}

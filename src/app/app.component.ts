import { Component } from '@angular/core';
import {CustomValidationService} from '../app/auth/services/custom-validation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'good-Reads';
  constructor(private authServices:CustomValidationService) {}
  onLogout(){
    this.authServices.logout();
  }
}

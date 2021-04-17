import { Component, OnInit } from '@angular/core';
import { CustomValidationService } from './auth/services/custom-validation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Client';

  constructor(private myService: CustomValidationService) {}
  ngOnInit() {
    console.log('root mounted');
    let token = localStorage.getItem('token');
    if (token) {
      this.myService.getUser(token).subscribe(
        (res: any) => {
          this.myService.setUserInfo(res);
        },
        (err) => {
          console.log(err);
          localStorage.removeItem('token');
        }
      );
    }
  }
}

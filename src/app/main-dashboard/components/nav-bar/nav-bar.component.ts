import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IUser } from 'src/app/auth/IUser';
import { CustomValidationService } from 'src/app/auth/services/custom-validation.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private myService: CustomValidationService,
    private router: Router
  ) {}
  isAuth: boolean = true;
  // isLoggedIn$: Observable<boolean>;
  userInfo: IUser;

  ngOnInit(): void {
    this.myService.getUserInfo().subscribe((res: IUser) => {
      this.userInfo = res;
    });
    this.myService.isAuthenticated.subscribe((res: any) => {
      this.isAuth = res;
    });
  }

  logout() {
    this.myService.logout();

    this.router.navigate(['/']);
  }
}

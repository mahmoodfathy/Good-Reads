import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { decodeToken } from '../auth/services/custom-validation.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService implements CanActivate {
  constructor(private router: Router) {}
  isAdmin() {
    const user = decodeToken();
    console.log(user.isAdmin);
    return user.isAdmin;
  }
  canActivate() {
    if (!this.isAdmin()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

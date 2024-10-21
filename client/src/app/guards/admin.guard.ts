import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../main/client/shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const isAdmin = this.userService.isAdmin();
    console.log(isAdmin);
    if (!isAdmin) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
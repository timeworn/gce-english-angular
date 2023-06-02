import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Promise<boolean> {
    const token = await this.authService.decodeToken();
    if (!token) {
      return false;
    }
    if (route.data && route.data.role) {
      const found = route.data.role.find(x => x === token.role);
      return Boolean(found);
    } else {
      return true;
    }
  }
}

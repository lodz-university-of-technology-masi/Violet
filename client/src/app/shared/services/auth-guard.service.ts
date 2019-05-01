import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserIdentity, UserRole} from '../model/user-model';
import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  userIdentity: UserIdentity;

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getUserIdentity().pipe(map(data => {
        this.userIdentity = data;
        return this.containsRole(this.userIdentity.roles, route.data.permittedRoles);
      }),
      catchError(error => {
          this.userIdentity = {
            email: 'not_login',
            roles: [UserRole.guest]
          };
          if (!this.containsRole(this.userIdentity.roles, route.data.permittedRoles)) {
            this.router.navigate(['/']);
          }
          return of(this.containsRole(this.userIdentity.roles, route.data.permittedRoles));
        }
      ));
  }

  containsRole(userRoles: UserRole[], permittedRoles: UserRole[]): boolean {
    for (const role of permittedRoles) {
      if (userRoles.includes(role)) {
        return true;
      }
    }
    return false;
  }
}

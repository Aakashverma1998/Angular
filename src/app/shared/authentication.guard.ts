import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,):boolean {
      this._authService.isAuthenticated().then(
        (status) => {
          if (this._authService.IsLoggedIn()) {
            
            if (this._authService.IsAuthenticated) {
              this._router.navigate(['dashboard'])
              return true;
            } else {
              return false;
            }
          } else {
            this._router.navigate(['login']);
            return false;
          }
  
        },
        (errStatus) => {
          return false
        }
      ).catch((err) => {
        return false;
        
        
      });
  
      return true;

  }
  
}

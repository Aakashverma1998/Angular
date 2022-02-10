import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this._authService.isAuthenticated().then(
      (status) => {
        
        if (this._authService.IsLoggedIn()) {
          console.log("1",status);
          
          if (this._authService.IsAuthenticated) {
            console.log("2",status);
            return true;
          } else {
            this._router.navigate(['login']);
            localStorage.removeItem("token");
            return false;
          }
        } else {
          console.log("3",status);
          this._router.navigate(['login']);
          return false;
        }

      },
      (errStatus) => {
        console.log("4",errStatus);
        return false
      }
    ).catch((err) => {
      console.log("5 dublicate",err);
      return false;
      
      
    });

    return true;
    
      

  }
}




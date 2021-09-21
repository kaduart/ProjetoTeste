import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuthorized =  this.authService.user.role.includes(route.data.role);
      if (!isAuthorized) {
        window.alert('Voc� n�o esta autorizado para acessar esta p�gina');
        this.router.navigate(['/list']);
      }
    return  this.authService.user.role.includes(route.data.role);
  }
  
}

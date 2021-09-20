import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
                                                                          | Promise<boolean | UrlTree>
                                                                          | boolean
                                                                          | UrlTree {

    return this.authenticationService.isLoggedIn$
      .pipe(
        map(loggedIn => loggedIn ? true : this.router.parseUrl('login'))
      )
  }
}

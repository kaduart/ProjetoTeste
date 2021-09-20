import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './_models/role';
import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: any;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {  }


  logout() {
      this.authenticationService.logout();
  }
}

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './../../_services/user.service';
import { User } from './../../_models/user';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[];

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {

    this.userService.getUserList()
    .pipe()
      .toPromise()
      .then((p) =>{
        this.users =  JSON.parse(p);        
     console.log('users', this.users); 

      });
 }


  updateUser(id: number) {
    this.router.navigate(['/update', id]);
  }

  userDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);

          this.getUserList();
        },
        error => console.log(error));
  }
  
   newUser(){
    this.router.navigate(['/add']);
   }
}

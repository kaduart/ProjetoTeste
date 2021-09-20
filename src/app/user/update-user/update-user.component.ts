import { UserService } from '../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.getUser(this.id);
  }

  getUser(id: number){

    if (id != null) {
      this.userService.getUser(id)
        .subscribe(data => {
          this.user = JSON.parse(data);
          console.log('update', this.user);
        });
    }

    return this.user;
  }

  onSubmit() {
    this.updateUser();    
  }
  
  updateUser() {
    this.userService.updateUser(this.id, this.user)
      .subscribe(data =>{
        console.log(data);

        this.goToList();
      });
  }

  goToList() {
    this.router.navigate(['/list']);
  }

}

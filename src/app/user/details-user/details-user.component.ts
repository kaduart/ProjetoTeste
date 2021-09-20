import { UserService } from '../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  id: number;
  user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.getUser();
  }

  getUser(){
    this.userService.getUser(this.id).subscribe(data => {
      this.user = JSON.parse(data);
      console.log('update', data)
    }, 
    error => console.log(error));
  }

  voltar(){
    this.router.navigate(['list']);
  }
}

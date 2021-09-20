import { AuthGuardService } from './_guards/auth-guard.guard';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UserListComponent } from './user/user-list/user-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DetailsUserComponent } from './user/details-user/details-user.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
    //canActivate: [AuthGuardService]
  },
  {
    path:'add',
    component: CreateUserComponent
  },
  {
    path:'list',
    component: UserListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path:'update/:id',
    component: UpdateUserComponent
  },
  {
    path:'details/:id',
    component: DetailsUserComponent
  },
  {
    path:'login',
    component: LoginComponent,
    
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
